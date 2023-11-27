const userModel = require("../models/userModel");
const catchAsync = require("./../utils/catchAsync");
exports.createUser = catchAsync(async (req, res) => {
  const user = await userModel.create(req.body);
  res.status(201).json({
    message: "user created",
    user,
  });
});

exports.getUser = catchAsync(async (req, res) => {
  const address = req.params.address;
  const user = await userModel.find({ address: address });
  console.log(data);
  res.status(200).json({
    message: "found the user",
    user,
  });
});
