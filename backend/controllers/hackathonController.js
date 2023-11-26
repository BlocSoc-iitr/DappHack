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
const hackathonModel = require("./../models/hackathonModel.js");

const teamModel = require("./../models/teamModel.js");
exports.createHackathon = async (req, res) => {
  //make a check if role is admin
  const hackathon = await hackathonModel.create(req.body);
  res.status(201).json({
    status: "success",
    hackathon,
    message: "hackathon created",
  });
};
exports.getAllProjects = async (req, res) => {
  const hackathonID = req.params.hackathonID;
  const hackathon = await hackathonModel.findById(hackathonID);
  if (hackathon) {
    const projects = [];
    console.log(hackathon);
    hackathon.teams.forEach(async (ele) => {
      projects.push((await teamModel.findById(ele)).project);
    });
    res.status(200).json({
      projects,
      message: "found all projects",
    });
  } else {
    res.status(400).json({
      message: "no such hackathon exist",
    });
  }
};
exports.getHackathon = async (req, res) => {
  const hackathonID = req.params.hackathonID;
  const hackathon = await hackathonModel.findById(hackathonID);
  if (hackathon) {
    res.status(200).json({
      hackathon,
      message: "found the hackathon",
    });
  } else {
    res.status(200).json({
      message: "no such hackathon exists",
    });
  }
};
exports.getAllTeams = async (req, res) => {
  const hackathonID = req.params.hackathonID;
  const hackathon = await hackathonModel.findById(hackathonID);

  let teamsData = [];
  async function processLoop(array) {
    array.forEach(async (ele) => {
      // console.log(ele);
      // console.log(await teamModel.findById(ele));
      var team = await teamModel.findById(ele);
      console.log(team);
      teamsData.push(team);
      console.log(teamsData);
    });
  }
  await processLoop(hackathon.teams);
  console.log(teamsData);
  console.log("reaached");
  if (teamsData) {
    res.status(200).json({
      teamsData,
      message: "these are the teams",
    });
  } else {
    res.status(400).json({
      message: "no teams have registered yet here",
    });
  }
};
exports.getProject = async (req, res) => {
  const { hackathonID, teamID } = req.params;
  const hackathon = await hackathonModel.findById(hackathonID);
  if (hackathon.teams.includes(teamID)) {
    const team = await teamModel.findById(teamID);
    const project = await team.project;
    res.status(200).json({
      project: project,
      message: "found something",
    });
  } else {
    res.status(400).json({
      message: "team is not in this hackathon",
    });
  }
};
exports.getWinners = async (req, res) => {
  const hackathonID = req.params.hackathonID;
  const hackathon = await hackathonModel.findById(hackathonID);
  const winners = await hackathon.winners;
  const winnersData = [];
  winners.forEach(async (ele) => {
    const t = await teamModel.findById(ele);
    winnersData.push(t);
  });
  res.status(200).json({
    message: "winners are here",
    winnersData,
  });
};
exports.createProject = async (req, res) => {
  const { hackathonID, teamID } = req.params;
  const hackathon = await hackathonModel.findById(hackathonID);
  if (hackathon.teams.includes(teamID)) {
    const team = await teamModel.findByIdAndUpdate(teamID, {
      project: req.body.project,
    });
    const project = team.project;
    res.status(200).json({
      project: project,
      message: "project created",
    });
  } else {
    res.status(400).json({
      message: "team is not in this hackathon",
    });
  }
};
exports.createTeam = async (req, res) => {
  const { hackathonID } = req.params;
  const team = await teamModel.create(req.body);
  const teams = [];
  teams.push(team._id);
  const hackathon = await hackathonModel.findByIdAndUpdate(hackathonID, {
    teams: teams,
  });

  res.status(201).json({
    message: "team registered",
    team,
  });
};
