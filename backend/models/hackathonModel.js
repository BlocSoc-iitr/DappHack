const mongoose = require("mongoose");

//sponsors,builders(&teams),projects,winners,
const hackathonSchema = new mongoose.Schema(
  {
    builders: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    teams: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Team",
      },
    ],
    sponsors: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Sponsor",
      },
    ],
    winners: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Team",
      },
    ],
    projects: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Project",
      },
    ],
    name: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
    },
    hackathonDescription: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    logo: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Hackathon = mongoose.model("Hackathon", hackathonSchema);
module.exports = Hackathon;
