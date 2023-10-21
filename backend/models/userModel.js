const sequelize = require("../db.js");
const emailValidator = require("email-validator");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "users",
  {
    address: {
      type: DataTypes.TEXT,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: function () {
        return emailValidator.validate(this.email);
      },
    },
    contactNumber: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = User;
