// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import {ProjectNFTs} from "./project.sol";
import { AxelarExecutable } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol';
import { IAxelarGateway } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol';
import { IAxelarGasService } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol';

contract DappHack is ProjectNFTs, AxelarExecutable {
    ///////////////////
    // Errors
    ///////////////////
    error InvalidTeamSize(uint256 teamSize, uint256 teamSizeLimit);
    error MaxParticipantsReached(uint256 maxParticipants);
    error InvalidProject(uint256 teamNumber);

    // interfaces, libraries, contracts
    ///////////////////
    // Types
    ///////////////////
    struct Sponsor {
        string name;
        address[] sponsors;
        uint256[] prizeArray; //track ke lie prize distribution
        uint256 poolPrize;
        uint256 numberOfPoolPrize;
    }

    struct Team {
        string name;
        address[] participants;
        bool validProject;
        bool projectSubmitted;
    }

    struct Winner {
        string name;
        uint256[] trackWinners;
        uint256[] poolPrizeWinners;
    }

    IAxelarGasService public immutable gasService;

    ///////////////////
    // State Variables
    ///////////////////

    //Organizers
    uint256 public constant STAKE = 1000000000000000;

    uint256 public s_startTime;
    uint256 public s_endTime;
    uint256 public s_totalPrizePool;
    uint256 public s_maxParticipants;
    uint256 public s_teamSizeLimit;
    address[] public s_organizers;

    //Sponsors
    Sponsor[] public s_sponsors;

    mapping(uint256 => uint256) public sponsorPrizePool; //sponsor number to prize pool
    mapping(address => uint256) public sponsorToId; //sponsor number to sponsor id
    mapping(address => Sponsor) public sponsorToSponsorProtocol; //sponsor number to sponsor struct
    //builders
    address[] public s_builders;

    mapping(address => Team) public builderToTeam;

    //teams
    Team[] public s_teams;

    //mapping(uint256 => uint256) public teamToProject;

    //winners
    Winner[] public s_winners;

    mapping(uint256 => Winner) public sponsorToWinner; //track number to winner number

    // Eventsteam
    event SponsorSignedUp(string name, address indexed sponsor, uint256 prize);
    event PrizePoolChanged(
        address indexed sponsor,
        uint256 oldPrize,
        uint256 newPrize
    );
    event BuilderSignedUp(address indexed builder);
    event TeamInitialized(string name, address[] participants);
    event TeamJoined(uint256 index, address indexed builder);
    event TeamLeft(uint256 index, address indexed builder);
    event ProjectSubmitted(uint256 teamNumber, string nftUri);
    event WinnerJudged(uint256 trackNumber, uint256 winnerNumber);
    event PrizeDistributed(uint256 amount);

    ///////////////////
    // Modifiers //
    ///////////////////
    modifier OnlySponsor() {
        //implement by getting sponsor id from sponsor address

        require(
            sponsorToId[msg.sender] != 0,
            "Only sponsors can call this function"
        );
        _;
    }
    modifier OnlyBuilder() {
        require(isBuilder(msg.sender), "Only builders can call this function");
        _;
    }
    modifier OnlyOrganizer() {
        require(
            isOrganizer(msg.sender),
            "Only organizers can call this function"
        );
        _;
    }

    modifier OnlyValidTeamSize(uint256 teamSize) {
        require(teamSize <= s_teamSizeLimit, "Invalid team size");
        _;
    }

    modifier OnlyMaxParticipantsNotReached() {
        require(
            s_builders.length < s_maxParticipants,
            "Max participants reached"
        );
        _;
    }

    modifier OnlyValidProject(uint256 teamNumber) {
        require(
            teamNumber < s_teams.length && s_teams[teamNumber].validProject,
            "Invalid project"
        );
        _;
    }

    //create mapping for this
     modifier NotInTeam(address[] memory participants) {
        // need a mapping from address(of the signer) to team as cant fetch a team that is not created

        for (uint i = 0; i < participants.length; i++) {
            require(
                bytes(builderToTeam[participants[i]].name).length == 0,
                "Already in a team"
            );
        }

        require(
            bytes(builderToTeam[msg.sender].name).length == 0,
            "Already in a team"
        );
        _;
    }
modifier DuplicateParticipants(address[] memory participant) {
        address[] memory AllParticipants = new address[](1 + participant.length);
    
        for (uint i = 0 ; i != participant.length; i++ ){
            AllParticipants[i] = participant[i];
        }
        
        AllParticipants[participant.length] = msg.sender;

        for (uint i = 0; i != AllParticipants.length; i++ ) {
            for (uint j = i + 1; j != AllParticipants.length; j++ ) {
                if(AllParticipants[j] == AllParticipants[i]) {
                   revert("Duplicate Participants");
                }
              
            }
           
        }
       
        _;
    }

    //create mapping for this
    modifier NotAlreadySignedUp() {
        bool flag = false;
        for (uint i = 0; i < s_builders.length; i++) {
            if (s_builders[i] == msg.sender) {
                flag = true;
                break;
            }
        }
        require(!flag, "Already signed up");
        _;
    }

    modifier TeamAlreadyExists(string memory teamName) {
        bool flag = false;
        for (uint i = 0; i < s_teams.length; i++) {
            if (
                keccak256(abi.encodePacked(s_teams[i].name)) ==
                keccak256(abi.encodePacked(teamName))
            ) flag = true;
        }
        require(flag == false, "Team already exists");
        _;
    }


    // Functions

    // Layout of Functions:
    // constructor

    /**
     * @dev Initializes the contract with the given parameters.
     * @param startTime The start time of the competition.
     * @param endTime The end time of the competition.
     * @param maxParticipants The maximum number of participants allowed in the competition.
     * @param teamSizeLimit The maximum size of a team in the competition.
     * @param organizers The addresses of the organizers of the competition.
     * @param name The name of the project NFT.
     * @param symbol The symbol of the project NFT.
     */
    constructor(
        uint256 startTime,
        uint256 endTime,
        uint256 maxParticipants,
        uint256 teamSizeLimit,
        address[] memory organizers,
        string memory name,
        string memory symbol,
        address gateway_,
        address gasReceiver_
    ) ProjectNFTs(name, symbol) AxelarExecutable(gateway_){
        s_startTime = startTime;
        s_endTime = endTime;
        s_totalPrizePool = 0;
        s_maxParticipants = maxParticipants;
        s_teamSizeLimit = teamSizeLimit;
        s_organizers = organizers;
        gasService = IAxelarGasService(gasReceiver_);
    }

    // receive function (if exists)
    receive() external payable {}

    // fallback function (if exists)
    fallback() external payable {}

    // external
    // public
    /**
     * @dev Distributes the prize for a track to the organizers.
     * @param prize The prize amount.
     * @param team The team that won the track.
     */
    function distributePrizeTrack(
        uint256 prize,
        Team memory team
    ) public payable OnlyOrganizer {
        uint256 num = team.participants.length;
        uint256 prizeToEach = prize / num;

        for (uint i = 0; i < num; ++i) {
            payable(msg.sender).transfer(prizeToEach);
        }
    }

    /**
     * @dev Distributes the prize for a pool prize to the organizers.
     * @param prize The prize amount.
     * @param team The team that won the pool prize.
     */

    function distributePrizePool(
        uint256 prize,
        Team memory team
    ) public payable OnlyOrganizer {
        uint256 num = team.participants.length;
        uint256 prizeToEach = prize / num;
        for (uint i = 0; i < num; ++i) {
            payable(msg.sender).transfer(prizeToEach);
        }
    }

    /**
     * @dev Allows a sponsor to sign up for the competition and contribute to the prize pool.
     * @param name The name of the sponsor.
     */
    function sponsorSignup(
        string memory name,
        address[] memory _sponsors,
        uint256[] memory _prizeArray,
        uint256 _poolPrize,
        uint256 _number0fPoolPrize
    ) public payable {
        // send a positive value
        require(msg.value > 0, "Invalid prize amount");

        uint256 sum = 0;

        for (uint i = 0; i < _prizeArray.length; ++i) {
            sum += _prizeArray[i];
        }

        // they give the right amount of prize
        require(msg.value >= sum + _poolPrize, "Invalid prize amount");

        //send the money to our escrow contract
        payable(address(this)).transfer(msg.value);
        // update total prize pool
        s_totalPrizePool += msg.value;

        s_sponsors.push(
            Sponsor(
                name,
                _sponsors,
                _prizeArray,
                _poolPrize,
                _number0fPoolPrize
            )
        );

        // give each sponsor a sponsor protocol
        for (uint i = 0; i < _sponsors.length; ++i) {
            sponsorToSponsorProtocol[_sponsors[i]] = s_sponsors[
                s_sponsors.length - 1
            ];
        }

        //give sponsor a id
        sponsorToId[msg.sender] = s_sponsors.length - 1;

        //add in sponsor prizepool array
        sponsorPrizePool[s_sponsors.length - 1] = msg.value; //safe when sponsor cant be deleted.

        emit SponsorSignedUp(name, msg.sender, msg.value);
    }

    /**
     * @dev Allows a sponsor to change the prize pool for their sponsorship.
     * @param sponsorNumber The index of the sponsor in the `s_sponsors` array.
     * @param newPrize The new prize amount for the sponsor.
     */

 function changePrizePool(
     uint256 sponsorNumber,
     uint256 newPrize
 ) public payable OnlySponsor {
     require(newPrize > 0, "Invalid prize amount");

     Sponsor memory sponsor = s_sponsors[sponsorNumber];

     uint256 temp_sum = 0;
     uint256[] memory temp_array = sponsor.prizeArray;
     for (uint i = 0; i < temp_array.length; ++i) {
         temp_sum += temp_array[i];
     }

        // check that the newPrize fund is greater than the sum of all the prizes
     require(
         newPrize >= temp_sum + sponsor.poolPrize,
         "Invalid prize amount"
     );

     uint256 oldPrize = sponsorPrizePool[sponsorNumber];

        int amt = int(newPrize - oldPrize);

         if (amt >= 0) {
             payable(address(this)).transfer(uint256(amt));
         } else {
             payable(msg.sender).transfer(uint256(-amt));
         }
         //update total prize pool
         s_totalPrizePool += uint256(amt);

         //prizePoolStructChange to be called

         sponsorPrizePool[sponsorNumber] = newPrize;
         s_sponsors[sponsorNumber].poolPrize = newPrize;

         emit PrizePoolChanged(msg.sender, oldPrize, newPrize);
     }

    /**
     * @dev Allows a builder to sign up for the competition.
     */
    function builderSignup()
        public
        payable
        OnlyMaxParticipantsNotReached
        NotAlreadySignedUp
    {
        require(msg.value >= STAKE, "Insufficient stake");

        s_builders.push(msg.sender);

        //transfer stake to contract

        payable(address(this)).transfer(STAKE);

        emit BuilderSignedUp(msg.sender);

        // builder withdraw ?
    }

    /**
     * @dev Initializes a team for the competition.
     * @param name The name of the team.
     * @param participants The addresses of the participants in the team.
     */
      function initializeTeam(
        string memory name,
        address[] memory participants
    )
        public 
        DuplicateParticipants(participants)
   
    {

     for(uint i = 0; i != participants.length; i++ ) {
            require(isBuilder(participants[i]), "Builder not found");
        }

        address[] memory totalParticipants = new address[](
            participants.length + 1
        );

        for (uint i = 0; i != participants.length; i++ ) {
            totalParticipants[i] = participants[i];
          
        }

        totalParticipants[participants.length] = msg.sender;

       crossinitializeTeam(name, totalParticipants);
    }

     /**
     * @dev Adds a participant to a particular team.
     * @param teamIndex Index of team in s_teams array which you want to join.
     */

    function joinTeam(uint256 teamIndex) public {
       crossjoinTeam(teamIndex, msg.sender);
    }

    /**
     * @dev Withdraws a participant from a particular team.
     * @dev Deletes the team if there are no participants left.
     * @param participantIndex Index of participant in team which you want to withdraw.
     * @param TeamIndex Index of team in s_teams array which you want to join.
    */
    function withdrawTeam(uint256 participantIndex , uint256 TeamIndex) public {
        crosswithdrawTeam(participantIndex, TeamIndex, msg.sender);
    }

    /**
     * @dev Submits a project for the competition.
     * @param teamNumber The index of the team in the `s_teams` array.
     * @param nftUri The ID of the project NFT.
     */
    function submitProject(
        uint256 teamNumber,
        string memory nftUri
    ) public OnlyBuilder {
      crosssubmitProject(teamNumber, nftUri);
    }

    /**
     * @dev Judges the winners of the competition.
     * @param trackWinners The indices of the track winners in the `s_teams` array.
     * @param poolPrizeWinners The indices of the pool prize winners in the `s_sponsors` array.
     */

    function judgeWinner(
        string memory _sponsor_name,
        uint256[] memory trackWinners,
        uint256[] memory poolPrizeWinners
    ) public OnlySponsor {
        //POSSIBLE ATTACK : a protocol has assigned 4 sponsors and each sponsor can give his own winners which is a problem
        crossjudgeWinner(_sponsor_name, trackWinners, poolPrizeWinners, msg.sender);
    }

    /**
     * @dev Distributes the prize pool to the organizers.
     */
    function distributePrize() public payable OnlyOrganizer {
        require(
            address(this).balance >= s_totalPrizePool,
            "Insufficient balance"
        );

        for (uint i = 0; i < s_sponsors.length; ++i) {
            // get the entire winner of that particular protocol
            Winner memory winners = sponsorToWinner[i];

            // track winners
            for (uint j = 0; j < winners.trackWinners.length; ++j) {
                distributePrizeTrack(
                    s_sponsors[i].prizeArray[j],
                    s_teams[winners.trackWinners[j]]
                );
            }

            // pool prize winners
            for (uint j = 0; j < winners.poolPrizeWinners.length; ++j) {
                distributePrizePool(
                    s_sponsors[i].poolPrize / s_sponsors[i].numberOfPoolPrize,
                    s_teams[winners.poolPrizeWinners[j]]
                );
            }
        }

        emit PrizeDistributed(address(this).balance);
    }

    function returnStake() public payable OnlyOrganizer {
        for (uint i = 0; i < s_teams.length; ++i) {
            if (s_teams[i].validProject == true) {
                for (uint j = 0; j < s_teams[i].participants.length; ++j) {
                    payable(s_teams[i].participants[j]).transfer(STAKE);
                }
            }
        }
    }

    // internal
    /**
     * @param teamNumber The index of the team in the `s_teams` array.
     */

    function transferNFTAfterHackathon(
        uint256 teamNumber
    ) internal OnlyValidProject(teamNumber) {
        Team memory t = s_teams[teamNumber];
        for (uint256 i = 0; i < t.participants.length; i++) {
            transferNFT(t.participants[i], tokenIdOf(t.participants[i]));
        }
    }

    // private

    // internal & private view & pure functions

    /**
     * @dev Checks if the given address is a sponsor.
     * @param sponsor The address to check.
     * @return True if the address is a sponsor, false otherwise.
     */
   

    /**
     * @dev Checks if the given address is a builder.
     * @param builder The address to check.
     * @return True if the address is a builder, false otherwise.
     */
    function isBuilder(address builder) internal view returns (bool) {
        for (uint256 i = 0; i < s_builders.length; i++) {
            if (s_builders[i] == builder) {
                return true;
            }
        }
        return false;
    }

    /**
     * @dev Checks if the given address is an organizer.
     * @param organizer The address to check.
     * @return True if the address is an organizer, false otherwise.
     */
    function isOrganizer(address organizer) internal view returns (bool) {
        for (uint256 i = 0; i < s_organizers.length; i++) {
            if (s_organizers[i] == organizer) {
                return true;
            }
        }
        return false;
    }

    // Axelar Cross-Chain Functions
  

    
    function _execute(string calldata sourceChain_, string calldata sourceAddress_, bytes calldata payload_) internal override {
        // // DealRequest calldata deal;
        // DealRequest[] memory deal = abi.decode(payload_, (DealRequest[]));
        // makeBatchDealProposal(deal);
        string memory _func;
      (_func) = abi.decode(payload_, (string));
      bytes32 _funcHash = keccak256(abi.encodePacked(_func));
      if(_funcHash == keccak256(abi.encodePacked("builderSignup"))) {

        (, address builder) = abi.decode(payload_, (string , address));
        require(!isBuilder(builder), "Already signed up");
        s_builders.push(builder);
        emit BuilderSignedUp(builder);

      }else if(_funcHash == keccak256(abi.encodePacked("initializeTeam"))){
         (, string memory _name , address[] memory participants) = abi.decode(payload_, (string, string, address[]));
         crossinitializeTeam(_name, participants);
      }else if(_funcHash == keccak256(abi.encodePacked("joinTeam"))){
          (, uint256 teamIndex, address  user) = abi.decode(payload_, (string, uint256, address));
          crossjoinTeam(teamIndex, user);
      }else if(_funcHash == keccak256(abi.encodePacked("withdrawTeam"))){
            (, uint256 participantIndex , uint256 teamIndex ,  address user) = abi.decode(payload_, (string, uint256, uint256, address));
            crosswithdrawTeam(participantIndex, teamIndex, user);
      }else if(_funcHash == keccak256(abi.encodePacked("submitProject"))){
            (, uint256 teamNumber, string memory nftUri, address user) = abi.decode(payload_, (string , uint256, string, address));
            require(isBuilder(user), "Not a Builder");
            crosssubmitProject(teamNumber , nftUri);
      }else if(_funcHash == keccak256(abi.encodePacked("judgeWinner"))){
       (,string memory _sponsor_name, uint256[] memory trackWinners, uint256[] memory poolPrizeWinners, address user) = abi.decode(payload_, (string,string , uint256[] , uint256[], address));
          
        require(
            sponsorToId[msg.sender] != 0,
            "Only sponsors can call this function"
        );
            crossjudgeWinner(_sponsor_name, trackWinners, poolPrizeWinners, user);
      }

    }

    function crossinitializeTeam(string memory name , address[] memory participants) internal
    TeamAlreadyExists(name) 
    OnlyValidTeamSize(participants.length)  {
     for(uint i = 0 ; i != participants.length ; i++ ){
            require(isBuilder(participants[i]), "Builder not found");
            require(
                bytes(builderToTeam[participants[i]].name).length == 0,
                "Already in a team"
            );
        }

        s_teams.push(Team(name, participants, false, false));

        for (uint256 i = 0; i != participants.length;  i++ ) {
            builderToTeam[participants[i]] = s_teams[s_teams.length - 1];
        }

        emit TeamInitialized(name, participants);
    }

    function crossjoinTeam(uint256 teamIndex, address user) internal {
        require(isBuilder(user), "Not a Builder");
        require(
            bytes(builderToTeam[user].name).length == 0,
            "Already in a team"
        );
        require(teamIndex < s_teams.length, "No such team exists");
        require(
            (s_teams[teamIndex].participants.length + 1) <= s_teamSizeLimit,
            "Team limit exceeded"
        );

        s_teams[teamIndex].participants.push(user);

        for(uint i = 0; i != s_teams[teamIndex].participants.length; i++ ) {
            builderToTeam[s_teams[teamIndex].participants[i]] = s_teams[teamIndex];
        }

        emit TeamJoined(teamIndex, user);
    }

    function crosswithdrawTeam(uint256 participantIndex, uint256 teamIndex, address user) internal {
        require(isBuilder(user), "Not a Builder");
        require(
            bytes(builderToTeam[user].name).length != 0,
            "You're not in any team"
        );

       address  temp =  s_teams[teamIndex].participants[participantIndex] ;
       s_teams[teamIndex].participants[participantIndex] = s_teams[teamIndex].participants[s_teams[participantIndex].participants.length - 1];
       s_teams[teamIndex].participants[s_teams[teamIndex].participants.length - 1] = temp;

       s_teams[teamIndex].participants.pop();
       

        delete builderToTeam[user];

        if (s_teams[teamIndex].participants.length == 0) {
           Team memory TempStruct = s_teams[teamIndex];
            s_teams[teamIndex] = s_teams[s_teams.length - 1];
            s_teams[s_teams.length - 1] = TempStruct;
            s_teams.pop();
        }else{
          for(uint i = 0; i != s_teams[teamIndex].participants.length; i++ ) {
              builderToTeam[s_teams[teamIndex].participants[i]] = s_teams[teamIndex];
          }
    
        }

        

    }

     function crosssubmitProject(
        uint256 teamNumber,
        string memory nftUri
    ) public{
        require(
            s_teams[teamNumber].projectSubmitted == false,
            "Project already submitted"
        );
        s_teams[teamNumber].validProject = true;
        for (uint256 i = 0; i < s_teams[teamNumber].participants.length; i++) {
            mint();
            setTokenOwner(s_tokenId, s_teams[teamNumber].participants[i]);
            setOwnerTokenId(s_teams[teamNumber].participants[i], s_tokenId);
            setTokenUri(s_tokenId, nftUri);
            s_teams[teamNumber].projectSubmitted = true;
        }
        emit ProjectSubmitted(teamNumber, nftUri);
    }
       function crossjudgeWinner(
        string memory _sponsor_name,
        uint256[] memory trackWinners, 
        uint256[] memory poolPrizeWinners,
        address user
       )internal {
           
        //POSSIBLE ATTACK : a protocol has assigned 4 sponsors and each sponsor can give his own winners which is a problem

        s_winners.push(Winner(_sponsor_name, trackWinners, poolPrizeWinners));

        sponsorToWinner[sponsorToId[user]] = s_winners[
            s_winners.length - 1
        ];

        // initialize sponsor to winner mapping
        emit WinnerJudged(s_winners.length - 1, poolPrizeWinners.length);
    }
       




    // external & public view & pure functions

    /**
     * @dev Returns the number of sponsors.
     * @return The number of sponsors.
     */
    function getSponsorCount() public view returns (uint256) {
        return s_sponsors.length;
    }

    /**
     * @dev Returns the name of the sponsor at the given index.
     * @param sponsorNumber The index of the sponsor.
     * @return The name of the sponsor.
     */
    function getSponsorName(
        uint256 sponsorNumber
    ) public view returns (string memory) {
        return s_sponsors[sponsorNumber].name;
    }

    /**
     * @dev Returns the address of the sponsor at the given index.
     * @param sponsorNumber The index of the sponsor.
     * @return The address of the sponsor.
     */
    function getSponsorAddress(
        uint256 sponsorNumber
    ) public view returns (address) {
        return s_sponsors[sponsorNumber].sponsors[0];
    }

    /**
     * @dev Returns the prize pool for the sponsor at the given index.
     * @param sponsorNumber The index of the sponsor.
     * @return The prize pool for the sponsor.
     */
    function getSponsorPrizePool(
        uint256 sponsorNumber
    ) public view returns (uint256) {
        return s_sponsors[sponsorNumber].poolPrize;
    }

    /**
     * @dev Returns the number of builders.
     * @return The number of builders.
     */
    function getBuilderCount() public view returns (uint256) {
        return s_builders.length;
    }

    /**
     * @dev Returns the address of the builder at the given index.
     * @param builderNumber The index of the builder.
     * @return The address of the builder.
     */
    function getBuilderAddress(
        uint256 builderNumber
    ) public view returns (address) {
        return s_builders[builderNumber];
    }

    /**
     * @dev Returns the number of teams.
     * @return The number of teams.
     */
    function getTeamCount() public view returns (uint256) {
        return s_teams.length;
    }

    /**
     * @dev Returns the name of the team at the given index.
     * @param teamNumber The index of the team.
     * @return The name of the team.
     */
    function getTeamName(
        uint256 teamNumber
    ) public view returns (string memory) {
        return s_teams[teamNumber].name;
    }

    /**
     * @dev Returns the number of participants in the team at the given index.
     * @param teamNumber The index of the team.
     * @return The number of participants in the team.
     */
    function getTeamSize(uint256 teamNumber) public view returns (uint256) {
        return s_teams[teamNumber].participants.length;
    }

    /**
     * @dev Returns the address of the participant in the team at the given index.
     * @param teamNumber The index of the team.
     * @param participantNumber The index of the participant.
     * @return The address of the participant.
     */
    function getTeamParticipantAddress(
        uint256 teamNumber,
        uint256 participantNumber
    ) public view returns (address) {
        return s_teams[teamNumber].participants[participantNumber];
    }

    // /**
    //  * @dev Returns the project NFT ID for the team at the given index.
    //  * @param teamNumber The index of the team.
    //  * @return The project NFT ID for the team.
    //  */
    // function getTeamProjectNftId(
    //     uint256 teamNumber
    // ) public view returns (uint256) {
    //     return teamToProject[teamNumber];
    // }

    /**
     * @dev Returns the number of winners.
     * @return The number of winners.
     */
    function getWinnerCount() public view returns (uint256) {
        return s_winners.length;
    }

    /**
     * @dev Returns the indices of the track winners for the winner at the given index.
     * @param winnerNumber The index of the winner.
     * @return The indices of the track winners.
     */
    function getWinnerTrackWinners(
        uint256 winnerNumber
    ) public view returns (uint256[] memory) {
        return s_winners[winnerNumber].trackWinners;
    }

    /**
     * @dev Returns the indices of the pool prize winners for the winner at the given index.
     * @param winnerNumber The index of the winner.
     * @return The indices of the pool prize winners.
     */
    function getWinnerPoolPrizeWinners(
        uint256 winnerNumber
    ) public view returns (uint256[] memory) {
        return s_winners[winnerNumber].poolPrizeWinners;
    }
}