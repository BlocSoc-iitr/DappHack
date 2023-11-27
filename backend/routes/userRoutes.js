const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/create", userController.createUser);//tested
router.get("/:address", userController.getUser);//tested

module.exports = router;
