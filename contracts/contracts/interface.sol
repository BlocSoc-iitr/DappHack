// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract universal {
    ///////////////////
    // Errors
    ///////////////////
    // write the errors here

    // interfaces, libraries, contracts
    ///////////////////
    // Types
    ///////////////////
    struct Sponsor {
        string name;
        // chain id not needed as sponsor may not be of any chain
        address[] sponsors;
        //prizes
        uint256[] prizeArray;
        uint256 poolPrize;
    }

    struct Team {
        string name;
        address[] participants;
        bool validProject;
    }

    struct Winner {
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

    //builders
    address[] public s_builders;

    mapping(address => Team) public builderToTeam;

    //teams
    Team[] public s_teams;

    mapping(uint256 => uint256) public teamToProject; //team number to project nft id

    //winners
    Winner[] s_winners;

    mapping(uint256 => uint256) public sponsorToWinner; //track number to winner number
    // Events


    ///////////////////
    // Modifiers //
    ///////////////////
    modifier OnlySponsor() {
        _;
    }
    modifier OnlyBuilder() {
        _;
    }
    modifier OnlyOrganizer() {
        _;
    }

    modifier OnlyValidTeamSize(uint256 teamSize){
        _;
    }

    modifier OnlyMaxParticipantsNotReached(){
        _;
    }

    modifier OnlyValidProject(uint256 teamNumber) {
        _;  
    }

      modifier NotInTeam(address[] memory participants) {
        _;
    }

    modifier DuplicateParticipants(address[] memory participant) {
        _;
    }

    modifier NotAlreadySignedUp() {
        _;  
    }

    modifier TeamAlreadyExists(string memory name) {
        _;
    }


    // Functions

    // Layout of Functions:
    // constructor

    constructor(
        uint256 startTime,
        uint256 endTime,
        uint256 totalPrizePool,
        uint256 maxParticipants,
        uint256 teamSizeLimit,
        address[] memory organizers
    ) {
        s_startTime = startTime;
        s_endTime = endTime;
        s_totalPrizePool = totalPrizePool;
        s_maxParticipants = maxParticipants;
        s_teamSizeLimit = teamSizeLimit;
        s_organizers = organizers;
    }

    // receive function (if exists)
    // fallback function (if exists)
    // external
    // public
    function sponsorSignup() public payable {}

    function changePrizePool() public payable {} //OnlySponsor

    function builderSignup() public payable {}

    function initializeTeam(address[] memory team) public {}  //TeamAlreadyExists()  OnlyValidTeamSize()   NotInTeam()   DuplicateParticipants()  OnlyBuilder()
  
    function submitProject() public {}

    function judgeWinner(Winner memory winner) public {} //onlySponsor

    function distributePrize() public payable {} //onlyOrganizer

    function joinTeam(uint256 teamIndex) public  {} //OnlyBuilder

    function withdrawTeam(uint256 participantIndex , uint256 TeamIndex) public {} //OnlyBuilder

    // internal
    // private
    // internal & private view & pure functions
    // external & public view & pure functions
}
