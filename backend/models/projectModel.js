const mongoose = require("mongoose");
// - project name
// - project description
// - project video
// - Tracks - description
// -team -data
const projectSchema = new mongoose.Schema(
  {
    team: {
      type: mongoose.Schema.ObjectId,
      ref: "Team",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    videolink: {
      type: String,
      required: true,
    },
    //just the overall description of each track the team applies for
    trackDescription: {
      type: String,
    },
    //onSubmission choose the tracks for ths project
    tracks: {
      type: [String],
    },
    projectLeader: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
