const mongoose = require("mongoose");

//sponsors,builders(teams),projects,winners,
const hackathonSchema = new mongoose.Schema({
  teams: {
    type: [mongoose.Schema.ObjectId],
  },
  sponsors: {
    type: JSON, //it will be sponsor name and their prize pool
  },
  winners: {
    type: [mongoose.Schema.ObjectId],
  },
});

const Hackathon = mongoose.model("Hackathon", hackathonSchema);
module.exports = Hackathon;
