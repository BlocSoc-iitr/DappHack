const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  address: { type: String, required: [true, "provide your address please"] },
  name: { type: String, required: [true, "name please"] },
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, "give a valid EmailId"],
  },
  contactNumber: {
    type: String,
  },
  profilePicture: { type: String },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
