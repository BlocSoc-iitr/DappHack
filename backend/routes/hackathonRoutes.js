const express = require("express");
const router = express.Router();
const hackathonController = require("../controllers/hackathonController");

router.get("/:hackathonID", hackathonController.getHackathon);//done
router.get("/:hackathonID/projects", hackathonController.getAllProjects);//tested
router.get("/:hackathonID/teams",hackathonController.getAllTeams)//done//tested
router.get("/:hackathonID/:teamID/project",hackathonController.getProject)//done//tested
router.get("/:hackathonID/winners",hackathonController.getWinners)//done//tested
// router.get("/:hackathonID/:projectID", hackathonController.getProject);
//admin can create a hackathon
router.post("/createHackathon", hackathonController.createHackathon);//done //tested
router.post("/:hackathonID/createTeam", hackathonController.createTeam);//done//tested
router.post("/:hackathonID/:teamID/submitProject",hackathonController.createProject);//done//tested

router.post("/create-nft-uri", hackathonController.createNft);

module.exports = router;
