const createNftUri = require("../utils/pinata/createNftUri.js");
const path = require("path");
const fs = require("fs");
exports.createNft = async (req, res) => {
  const { file } = req.files;
  const { name, description, triats } = req.body;

  file.mv("nftFiles/" + file.name, (err) => {
    console.log("Upload Successful!");
  });
  const formData = {};
  formData.name = name;
  formData.description = description;
  formData.traits = name;
  formData.filename = file.originalName;

  console.log(
    `NFT created: Name: ${formData.name}, Description: ${formData.description}, Traits: ${formData.traits}`
  );

  const response = await createNftUri(formData);
  //   const response = ["ipfs://QmUttGTuPbQkuroyGqrX3gS2b9SPdtYvyXLtxZjLHhgGuZ"];

  console.log("here");
  console.log(response);

  res.status(200).json({ message: "NFT created successfully", Uri: response });
};
