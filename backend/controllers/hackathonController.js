const createNftUri = require("../utils/pinata/createNftUri.js");
const path = require("path");
const fs = require("fs");
exports.createNft = async (req, res) => {
  const { file } = req.files;
  const { name, description, triats } = req.body;

  file.mv("nftFiles/" + file.name, (err) => {
    console.log("Upload Successful!");
  });
  const formData = {};
  formData.name = name;
  formData.description = description;
  formData.traits = name;
  formData.filename = file.originalName;

  console.log(
    `NFT created: Name: ${formData.name}, Description: ${formData.description}, Traits: ${formData.traits}`
  );

  const response = await createNftUri(formData);
  //   const response = ["ipfs://QmUttGTuPbQkuroyGqrX3gS2b9SPdtYvyXLtxZjLHhgGuZ"];

  console.log("here");
  console.log(response);

  res.status(200).json({ message: "NFT created successfully", Uri: response });
};

//////////////////////////////////////////
const AppError = require("./../utils/appError.js");
const catchAsync = require("./../utils/catchAsync.js");
const userModel = require("./../models/userModel.js");
const hackathonModel = require("./../models/hackathonModel.js");
const projectModel = require("./../models/projectModel.js");
const sponsorModel = require("./../models/sponsorModel.js");
const teamModel = require("./../models/teamModel.js");

//post
exports.createHackathon = catchAsync(async (req, res, next) => {
  const hackathon = await hackathonModel.create(req.body);
  res.status(201).json({
    status: "success",
    hackathon,
    message: "hackathon created",
  });
});
exports.createProject = catchAsync(async (req, res, next) => {
  const { hackathonID, teamID } = req.params;
  const project = await projectModel.create(req.body);
  const hackathon = await hackathonModel.findById(hackathonID);
  if (hackathon.teams.includes(teamID)) {
    const team = await teamModel.findByIdAndUpdate(teamID, {
      project: project._id,
    });
    let projects = hackathon.projects;
    projects.push(project._id);
    console.log(projects.includes(project._id));
    const hackathonUpdated = await hackathonModel.findByIdAndUpdate(
      hackathonID,
      {
        projects: projects,
      }
    );
    res.status(200).json({
      project: project,
      message: "project created",
    });
  } else {
    return next(new AppError("no such team in this hackathon", 400));
  }
});
exports.createTeam = catchAsync(async (req, res, next) => {
  const { hackathonID } = req.params;
  //assuming req.body has a members array whose  elements are objects with user's address and name
  let dataInside = req.body;
  let members = req.body.members;
  const findUser = async (ele) => {
    let user = await userModel.findOne({ address: ele.address });
    ele = user._id;
  };
  for (const ele of members) {
    await findUser(ele);
  }
  console.log(dataInside);
  const team = await teamModel.create(dataInside);
  const hackathon = await hackathonModel.findById(hackathonID);
  let teams = hackathon.teams;
  teams.push(team._id);
  const hackathonUpdated = await hackathonModel.findByIdAndUpdate(hackathonID, {
    teams: teams,
  });
  console.log(hackathonUpdated);
  res.status(201).json({
    message: "team registered",
    team,
  });
});
exports.createBuilder = catchAsync(async (req, res, next) => {
  const hackathonID = req.params.hackathonID;
  const hackathon = await hackathonModel.findById(hackathonID);
  let builders = hackathon.builders;
  //if req has builder address
  const user = await userModel.findOne({ address: req.body.address });
  if (user) {
    builders.push(user._id);
  } else {
    const user = await userModel.create(req.body);
    builders.push(user._id);
  }
  const hackathonUpdated = await hackathonModel.findByIdAndUpdate(hackathonID, {
    builders: builders,
  });
  res.status(200).json({
    message: "you have been registered",
  });
});

///get
exports.getBuilder = catchAsync(async (req, res, next) => {
  const { hackathonID, address } = req.params;
  const hackathon = await hackathonModel.findById(hackathonID);
  const user = await userModel.findOne({ address: address });
  if (user && hackathon.builders.includes(user._id)) {
    res.status(200).json({
      message: "got the builder",
      user,
    });
  } else {
    return next(new AppError("builder not in this hackathon", 400));
  }
});

exports.getAllProjects = catchAsync(async (req, res, next) => {
  const hackathonID = req.params.hackathonID;
  const hackathon = await hackathonModel
    .findById(hackathonID)
    .populate("projects");
  if (hackathon) {
    const projects = hackathon.projects;
    console.log(projects);
    res.status(200).json({
      projects,
      message: "found all projects",
    });
  } else {
    return next(new AppError("no such hackathon exists", 400));
  }
});
exports.getHackathon = catchAsync(async (req, res, next) => {
  const hackathonID = req.params.hackathonID;
  const hackathon = await hackathonModel.findById(hackathonID);
  if (hackathon) {
    res.status(200).json({
      hackathon,
      message: "found the hackathon",
    });
  } else {
    return next(new AppError("hackathon doesnot exist", 400));
  }
});
exports.getAllTeams = catchAsync(async (req, res, next) => {
  const hackathonID = req.params.hackathonID;
  const hackathon = await hackathonModel
    .findById(hackathonID)
    .populate("teams");

  if (hackathon) {
    let teamsData = hackathon.teams;
    console.log(teamsData);
    res.status(200).json({
      teamsData,
      message: "these are the teams",
    });
  } else {
    return next(new AppError("no such hackathon exists", 400));
  }
});
exports.getProject = catchAsync(async (req, res, next) => {
  const { hackathonID, teamID } = req.params;
  const hackathon = await hackathonModel.findById(hackathonID);
  if (hackathon.teams.includes(teamID)) {
    const team = await teamModel.findById(teamID).populate("project");
    const project = team.project;
    res.status(200).json({
      project: project,
      message: "found something",
    });
  } else {
    return next(new AppError("team is not in this hackathon", 400));
  }
});
exports.getTeam = catchAsync(async (req, res, next) => {
  const { hackathonID, projectID } = req.params;
  if (await hackathonModel.findById(hackathonID)) {
    const project = await projectModel.findById(projectID);
    if (project) {
      const teamID = project.team;
      const team = await teamModel
        .findById(teamID)
        .populate("members")
        .populate("project");
      console.log(team);
      res.status(200).json({
        message: "this is the team info",
        team,
      });
    } else {
      return next(new AppError("no such project exists", 400));
    }
  } else {
    return next(new AppError("hackathon not found", 400));
  }
});
// implementation uncompleted
exports.getWinners = catchAsync(async (req, res, next) => {
  const hackathonID = req.params.hackathonID;
  const hackathon = await hackathonModel.findById(hackathonID);
});
