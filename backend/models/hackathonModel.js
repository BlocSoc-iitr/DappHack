const mongoose = require("mongoose");

//sponsors,builders(teams),projects,winners,
const hackathonSchema = new mongoose.Schema(
  {
    teams: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Team",
      },
    ],
    sponsors: {
      type: JSON, //it will be sponsor name and their prize pool
    },
    winners: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Team",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Hackathon = mongoose.model("Hackathon", hackathonSchema);
module.exports = Hackathon;
