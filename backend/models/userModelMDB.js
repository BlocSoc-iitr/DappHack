const mongoose = require("mongoose");

const validator = require("validator");

// address: {
//     type: DataTypes.TEXT,
//     primaryKey: true,
//   },
//   name: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//     validate: function () {
//       return emailValidator.validate(this.email);
//     },
//   },
//   contactNumber: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   role: {
//     type: DataTypes.JSON,
//     allowNull: false,
//   },
//   profilePicture: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
const userSchema = new mongoose.Schema({
  address: { type: String, required: [true, "provide your address please"] },
  name: { type: String, required: [true, "name please"] },
  email: {
    type: String,
    unique: true,
    required: [true, "provide a valid email"],
    validate: [validator.isEmail, "give a valid EmailId"],
  },
  contactNumber: {
    type: String,
    required: [true, "provide your contact number"],
  },
  role: {
    type: [String],
    //enum
    default: ["user"],
  },
  profilePicture: { type: String, required: false },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
