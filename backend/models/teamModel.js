const mongoose = require("mongoose");
const teamSchema = mongoose.Schema(
  {
    teamname: {
      type: String,
    },
    members: [
      {
        type: mongoose.Schema.ObjectId, //user ids
        required: true,
        ref: "User",
      },
    ],
    project: {
      type: mongoose.Schema.ObjectId, //ids

      ref: "Project",
    },
    teamsize: {
      type: Number,
      validate: function () {
        return this.teamsize < 5;
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
