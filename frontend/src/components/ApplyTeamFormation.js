import classes from "@/styles/HackApply.module.css";
const ApplyTeamInformation = ({
  teamName,
  setTeamName,
  teamMembers,
  handleAddTeamMember,
  handleRemoveTeamMember,
  handlePrevious,
  handleTeamSignup,
  isLoading,
}) => {
  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  return (
    <div>
      <div className={classes["apply-basics"]}>
        <div className={classes["input-field-container"]}>
          <label htmlFor="team-name">Enter Team Name</label>
          <input
            type="text"
            id="team-name"
            placeholder="Hackathon"
            value={teamName}
            onChange={handleTeamNameChange}
          />
        </div>
        <div className={classes["address-container"]}>
          <h3>Team members:</h3>
          <form onSubmit={handleAddTeamMember}>
            <input
              type="text"
              placeholder="Enter Team Member's Address"
              name="team-member-address"
            />
            <button className={classes["add-btn"]}>Add</button>
          </form>
        </div>
        <div className={classes["team-members-infromation"]}>
          <div className={classes.row}>
            <p>Team Member's Name</p>
            <p>Team Member's Address</p>
            <p>Team Member's Address</p>
            <p>Action</p>
          </div>
          {teamMembers.map((address, index) => (
            <div className={classes.row} key={address}>
              <p>Team Member {index + 1}</p>
              <p>{address}</p>
              <p>{address}</p>
              <div>
                <button onClick={() => handleRemoveTeamMember(index)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={classes["btn-group"]}>
        <button onClick={handlePrevious} className={classes["cancel-btn"]}>
          Previous
        </button>
        <button onClick={handleTeamSignup} className={classes["next-btn"]}>
          {isLoading ? <div className="spin"></div> : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default ApplyTeamInformation;
