const teamModel = require("./../models/teamModel.js");
const catchAsync = require("./../utils/catchAsync.js");

exports.getTeam = catchAsync(async (req, res, next) => {
  const teamId = req.params.teamID;
  const team = await teamModel.findById(teamId);
  res.status(200).json({
    message: "Team",
    team,
  });
});

exports.createTeam = catchAsync(async (req, res, next) => {
  const newTeam = await teamModel.create(req.body);
  res.status(200).json({
    message: "Team Created",
    newTeam,
  });
});

exports.updateTeam = catchAsync(async (req, res, next) => {
  const teamId = req.params.teamID;
  const data = req.body;
  const userId = req.params.userID;
  const checkTeam = await teamModel.findById(teamId);

  if (checkTeam.teamLeader != userId) {
    return res.status(401).json({
      message: "You are not authorized to update this team",
    });
  }

  const team = await teamModel.findByIdAndUpdate(teamId, data, {
    new: true,
  });

  res.status(200).json({
    message: "Team updated",
    team,
  });
});

exports.deleteTeam = catchAsync(async (req, res, next) => {
  const teamId = req.params.teamID;
  const team = await teamModel.findByIdAndDelete(teamId);
  const userId = req.params.userID;
  const checkTeam = await teamModel.findById(teamId);

  if (checkTeam.teamLeader != userId) {
    return res.status(401).json({
      message: "You are not authorized to delete this team",
    });
  }

  res.status(200).json({
    message: "Team deleted",
    team,
  });
});

exports.getAllTeamsOfhackthodId = catchAsync(async (req, res, next) => {
  const hackthodId = req.params.hackthodID;
  const teams = await teamModel
    .find({ hackthodId: hackthodId })
    .populate("team");
  res.status(200).json({
    message: "All teams of a hackthod",
    teams,
  });
});

exports.getTeamsOfhackthodIdByPagination = catchAsync(
  async (req, res, next) => {
    const hackthodId = req.params.hackthodID;
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const teams = await teamModel
      .find({ hackthodId: hackthodId })
      .populate("team")
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      message: "All teams of a hackthod",
      teams,
    });
  }
);

exports.getTeamsOfUser = catchAsync(async (req, res, next) => {
  const userId = req.params.userID;
  const teams = await teamModel.find({ members: userId }).populate("members");
  res.status(200).json({
    message: "All teams of a user",
    teams,
  });
});

exports.joinTeamBySecretkey = catchAsync(async (req, res, next) => {
  const secretkey = req.params.secretkey;
  const team = await teamModel.findOne({ secretkey: secretkey });
  if (team) {
    const userId = req.params.userID;
    const members = [...team.members];
    members.push(userId);
    const updatedTeam = await teamModel.findByIdAndUpdate(
      team._id,
      { members: members },
      { new: true }
    );
    res.status(200).json({
      message: "Team joined",
      updatedTeam,
    });
  } else {
    res.status(404).json({
      message: "Team not found",
    });
  }
});

exports.leaveTeam = catchAsync(async (req, res, next) => {
  const teamId = req.params.teamID;
  const userId = req.params.userID;
  const team = await teamModel.findById(teamId);
  const members = [...team.members];
  const index = members.indexOf(userId);
  if (index > -1) {
    members.splice(index, 1);
  }
  const updatedTeam = await teamModel.findByIdAndUpdate(
    teamId,
    { members: members },
    { new: true }
  );
  res.status(200).json({
    message: "Team left",
    updatedTeam,
  });
});

exports.removeMemberFromTeam = catchAsync(async (req, res, next) => {
  const userId = req.params.userID;
  const teamId = req.params.teamID;
  const leaderId = req.params.leaderID;
  const team = await teamModel.findById(teamId);

  if (!team) {
    return res.status(404).json({
      message: "Team not found",
    });
  }

  if (team.teamLeader === leaderId) {
    return res.status(401).json({
      message: "You are not authorized to remove this member",
    });
  }

  const members = [...team.members];
  const index = members.indexOf(userId);
  if (index > -1) {
    members.splice(index, 1);
  }
  const updatedTeam = await teamModel.findByIdAndUpdate(
    teamId,
    { members: members },
    { new: true }
  );
  res.status(200).json({
    message: "Member removed from team",
    updatedTeam,
  });
});
