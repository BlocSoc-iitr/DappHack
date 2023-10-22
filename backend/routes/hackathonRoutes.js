const express = require("express");
const router = express.Router();
const hackathonController = require("../controllers/hackathonController");

router.post("/create-nft-uri", hackathonController.createNft);

module.exports = router;
