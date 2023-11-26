const express = require("express");
const router = express.Router();
const userControllerMDB = require("../controllers/userControllerMDB");

router.post("/create", userControllerMDB.createUser);//tested
router.get("/:address", userControllerMDB.userData);//tested

module.exports = router;
