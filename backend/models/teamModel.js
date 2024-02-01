const mongoose = require("mongoose");

const generateSecretKey = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  let secretkey = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 12; i++) {
    secretkey += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return secretkey;
};

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
    hackthodId: {
      type: mongoose.Schema.ObjectId,
      ref: "Hackathon",
    },
    teamLeader: {
      type: String,
      required: true,
    },
    secretkey: {
      type: String,
      required: true,
      default: generateSecretKey(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
