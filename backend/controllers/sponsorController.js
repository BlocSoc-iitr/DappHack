const AppError = require("./../utils/appError.js");
const catchAsync = require("./../utils/catchAsync.js");
const userModel = require("./../models/userModel.js");
const hackathonModel = require("./../models/hackathonModel.js");
const projectModel = require("./../models/projectModel.js");
const sponsorModel = require("./../models/sponsorModel.js");
const teamModel = require("./../models/teamModel.js");

exports.getSponsors = catchAsync(async (req, res, next) => {
  const hackathonID = req.params.hackathonID;
  const hackathon = await hackathonModel
    .findById(hackathonID)
    .populate("sponsors");
  let sponsors = hackathon.sponsors;
  res.status(200).json({
    message: "all sponsors",
    sponsors,
  });
});

exports.createSponsor = catchAsync(async (req, res, next) => {
  const hackathonID = req.params.hackathonID;
  console.log(hackathonID);
  const hackathon = await hackathonModel.findById(hackathonID);
  console.log(hackathon);
  let sponsors = hackathon.sponsors;
  const sponsor = await sponsorModel.create(req.body);
  sponsors.push(sponsor._id);
  const hackathonUpdated = await hackathonModel.findByIdAndUpdate(hackathonID, {
    sponsors: sponsors,
  });
  res.status(200).json({
    message: "you have been registered as a sponsor",
    sponsor,
  });
});
