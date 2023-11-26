const userModelMDB = require("../models/userModelMDB");

exports.createUser = async (req, res) => {
  try {
    const data = await userModelMDB.create(req.body);
    res.status(201).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.userData = async (req, res) => {
  try {
    const address = req.params.address;
    const data = await userModelMDB.find({ address: address });
    console.log(data);
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
