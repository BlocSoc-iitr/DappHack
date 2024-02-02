const projectModel = require("./../models/projectModel.js");
const catchAsync = require("./../utils/catchAsync.js");

exports.getProject = catchAsync(async (req, res, next) => {
  const projectId = req.params.projectID;
  const project = await projectModel.findById(projectId);
  res.status(200).json({
    message: "Project",
    project,
  });
});

exports.submissionProject = catchAsync(async (req, res, next) => {
  const newProject = await projectModel.create(req.body);
  res.status(200).json({
    message: "Project submitted",
    newProject,
  });
});

exports.updateProject = catchAsync(async (req, res, next) => {
  const projectId = req.params.projectID;
  const data = req.body;
  const leaderId = req.params.leaderId;

  const checkProject = await projectModel.findById(projectId);
  if (checkProject.projectLeader != leaderId) {
    return res.status(401).json({
      message: "You are not authorized to update this project",
    });
  }

  const project = await projectModel.findByIdAndUpdate(projectId, data, {
    new: true,
  });

  res.status(200).json({
    message: "Project updated",
    project,
  });
});

exports.deleteProject = catchAsync(async (req, res, next) => {
  const projectId = req.params.projectID;
  const leaderId = req.params.leaderId;
  const checkProject = await projectModel.findById(projectId);

  if (checkProject.projectLeader != leaderId) {
    return res.status(401).json({
      message: "You are not authorized to delete this project",
    });
  }

  const project = await projectModel.findByIdAndDelete(projectId);
  res.status(200).json({
    message: "Project deleted",
    project,
  });
});

exports.getAllProjectsOfaUser = catchAsync(async (req, res, next) => {
  const userId = req.params.userID;
  const projects = await projectModel
    .find({ "team.members": userId })
    .populate("team.members");
  res.status(200).json({
    message: "All projects of a user",
    projects,
  });
});

exports.getProjectOfaTeam = catchAsync(async (req, res, next) => {
  const teamId = req.params.teamID;
  const project = await projectModel.find({ team: teamId }).populate("team");
  res.status(200).json({
    message: "Project of a team",
    project,
  });
});
