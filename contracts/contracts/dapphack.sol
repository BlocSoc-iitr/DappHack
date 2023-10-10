// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract DappHack {
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
    }

    struct Winner {
        string name;
        uint256[] trackWinners;
        uint256[] poolPrizeWinners;
    }

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
    event ProjectSubmitted(uint256 teamNumber, uint256 projectNftId);
    event WinnerJudged(uint256 trackNumber, uint256 winnerNumber);
    event PrizeDistributed(uint256 amount);

    ///////////////////
    // Modifiers //
    ///////////////////
    modifier OnlySponsor() {
        //implement by getting sponsor id from sponsor address

        require(sponsorToId[msg.sender] != 0, "Only sponsors can call this function")
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
    modifier NotInTeam () {
        require(s_teams[msg.sender] == 0, "Already in a team");
        _;
    }
    
    //create mapping for this
    modifier NotAlreadySignedUp() {
        require(s_builders[msg.sender] == 0, "Already signed up");
    }
    // Functions

    // Layout of Functions:
    // constructor

    /**
     * @dev Initializes the contract with the given parameters.
     * @param startTime The start time of the competition.
     * @param endTime The end time of the competition.
     * @param totalPrizePool The total prize pool for the competition.
     * @param maxParticipants The maximum number of participants allowed in the competition.
     * @param teamSizeLimit The maximum size of a team in the competition.
     * @param organizers The addresses of the organizers of the competition.
     */
    constructor(
        uint256 startTime,
        uint256 endTime,
        uint256 maxParticipants,
        uint256 teamSizeLimit,
        address[] memory organizers
    ) {
        s_startTime = startTime;
        s_endTime = endTime;
        s_totalPrizePool = 0;
        s_maxParticipants = maxParticipants;
        s_teamSizeLimit = teamSizeLimit;
        s_organizers = organizers;
    }

    // receive function (if exists)
    receive() external payable {}

    // fallback function (if exists)
    fallback() external payable {}

    // external
    // public

    /**
     * @dev Allows a sponsor to sign up for the competition and contribute to the prize pool.
     * @param name The name of the sponsor.
     */
    function sponsorSignup(string memory name, address[] _sponsors , uint256[] _prizeArray , uint256 _poolPrize , uint256 _number0fPoolPrize) public payable {
       
        // send a positive value 
        require(msg.value > 0, "Invalid prize amount");
        
        uint256 sum = 0;

        for(int i=0;i<_prizeArray.length;++i){
           sum += _prizeArray[i];
        }
        
        // they give the right amount of prize
        require(msg.value >= sum + _poolPrize, "Invalid prize amount");
        
        //send the money to our escrow contract
        payable(address(this)).transfer(msg.value);       
        // update total prize pool
        s_totalPrizePool += msg.value;
        
        s_sponsors.push(
            Sponsor(name,_sponsors,_prizeArray,_poolPrize,_number0fPoolPrize);
        );
        
        // give each sponsor a sponsor protocol
        for(int i=0;i<_sponsors.length;++i){
           sponsorToSponsorProtocol[_sponsors[i]] = s_sponsors[s_sponsors.length - 1];
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

        Sponsor public sponsor = s_sponsors[sponsorNumber];

        int temp_sum = 0;
        uint256[] temp_array = sponsor.prizeArray;
        for(int i=0;i<temp_array.length;++i){
           temp_sum += temp_array[i];
        }
         
        // check that the newPrize fund is greater than the sum of all the prizes
        require(newPrize >= temp_sum + sponsor.poolPrize, "Invalid prize amount");
        
        
        uint256 oldPrize = sponsorPrizePool[sponsorNumber];


        int amt = newPrize - oldPrize;

        if(amt>=0){
           payable(address(this)).transfer(amt);
        }else{
           msg.sender.transfer(-amt);
        }
        //update total prize pool
        s_totalPrizePool += amt;

        //prizePoolStructChange to be called


        sponsorPrizePool[sponsorNumber] = newPrize;
        s_sponsors[sponsorNumber].poolPrize = newPrize;


        emit PrizePoolChanged(msg.sender, oldPrize, newPrize);

    }

    function changePrizePoolSTruct() public payable {
        /// TODO
    }

    /**
     * @dev Allows a builder to sign up for the competition.
     */
    function builderSignup() public payable OnlyMaxParticipantsNotReached , NotAlreadySignedUp {

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
    ) public OnlyValidTeamSize , NotInTeam {

        //add the team to the team array
        s_teams.push(Team(name, participants, false)); // ATTACK_VECTOR: People can add members already in a team , a Problem
        
        // give the team to builder in mapping

        for (uint256 i = 0; i < participants.length; i++) {
            builderToTeam[participants[i]] = s_teams[s_teams.length - 1];
        }

        emit TeamInitialized(name, participants);

        //team withdraw ? 
    }

    /**
     * @dev Submits a project for the competition.
     * @param teamNumber The index of the team in the `s_teams` array.
     * @param projectNftId The ID of the project NFT.
     */
    function submitProject(
        uint256 teamNumber,
        uint256 projectNftId
    ) public (uint256 teamNumber) { 
        s_teams[teamNumber].validProject = true;
        teamToProject[teamNumber] = projectNftId;
        emit ProjectSubmitted(teamNumber, projectNftId);
    }

    /**
     * @dev Judges the winners of the competition.
     * @param trackWinners The indices of the track winners in the `s_teams` array.
     * @param poolPrizeWinners The indices of the pool prize winners in the `s_sponsors` array.
     */

    function judgeWinner(
        string _sponsor_name.
        uint256[] memory trackWinners,
        uint256[] memory poolPrizeWinners
    ) public OnlySponsor {
        //POSSIBLE ATTACK : a protocol has assigned 4 sponsors and each sponsor can give his own winners which is a problem

        s_winners.push(Winner(_sponsor_name, trackWinners, poolPrizeWinners));

        sponsorToWinner[sponsorToId[msg.sender]] = s_winners[s_winners.length - 1];

        // initialize sponsor to winner mapping
        emit WinnerJudged(s_winners.length - 1, poolPrizeWinners.length);
    }

    /**
     * @dev Distributes the prize pool to the organizers.
     */
    function distributePrize() public payable OnlyOrganizer {
        
        require(
            address(this).balance >= s_totalPrizePool,
            "Insufficient balance"
        );

       for(int i=0;i<s_sponsors.length;++i){

        // get the entire winner of that particular protocol
        Winner winners =  sponsorToWinner[i];

        // track winners
         for(int j=0;j<winners.trackWinners.length;++j){
            distributePrizeTrack(s_sponsor[i].trackPrize[j],s_team[winners.trackWinners[j]]);
         }

        // pool prize winners
         for(int j=0;j<winners.poolPrizeWinners.length;++j){
            distributePrizePool(s_sponsor[i].poolPrize/s_sponsor[i].numberOfPoolPrize,s_team[winners.poolPrizeWinners[j]]);
         }

       }

        emit PrizeDistributed(address(this).balance);
    }

    function returnStake(address sponsor) public payable {}

    // internal
    // private

    // internal & private view & pure functions
    
    function distributePrizeTrack (uint256 prize, Team team) internal payable {
         
        uint256 num = team.participants;
        uint256 prizeToEach = prize / num;

        for(int i=0;i<num;++i){
            msg.sender.transfer(prizeToEach);
        }
    }
    
    function distributePrizePool (uint256 , Team team) internal payable {
     
          
        uint256 num = team.participants;
        uint256 prizeToEach = prize / num;

        for(int i=0;i<num;++i){
            msg.sender.transfer(prizeToEach);
        }
    }


    /**
     * @dev Checks if the given address is a sponsor.
     * @param sponsor The address to check.
     * @return True if the address is a sponsor, false otherwise.
     */
    function isSponsor(
        address sponsor,
        uint256 sponsorId
    ) internal view returns (bool) {
        Sponsor memory s = s_sponsors[sponsorId];
        for (uint256 i = 0; i < s.sponsors.length; i++) {
            if (s.sponsors[i] == sponsor) {
                return true;
            }
        }
        return false;
    }

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

    /**
     * @dev Returns the project NFT ID for the team at the given index.
     * @param teamNumber The index of the team.
     * @return The project NFT ID for the team.
     */
    function getTeamProjectNftId(
        uint256 teamNumber
    ) public view returns (uint256) {
        return teamToProject[teamNumber];
    }

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
