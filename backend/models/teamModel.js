const mongoose = require("mongoose");
const teamSchema = mongoose.Schema({
  members: {
    type: [mongoose.Schema.ObjectId], //user ids
    required: true,
  },
  project: {
    type: String, //url
    required: false,
  },
  teamsize: {
    type: Number,
    validate: function () {
      return this.teamsize < 5;
    },
  },
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
