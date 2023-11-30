const express = require("express");
const router = express.Router();
const hackathonController = require("../controllers/hackathonController");

const sponsorController = require("../controllers/sponsorController");
router.post(
  "/:hackathonID/sponsor/createSponsor",
  sponsorController.createSponsor
); //tested
router.get(
  "/:hackathonID/sponsor/sponsorDetails",
  sponsorController.getSponsors
); //tested

//write stratTime ,endTime constraints for every function if needed
router.post("/createHackathon", hackathonController.createHackathon); //tested
router.get("/:hackathonID", hackathonController.getHackathon); //tested

router.get("/:hackathonID/projects", hackathonController.getAllProjects); //done
router.get("/:hackathonID/teams", hackathonController.getAllTeams); //done
router.get("/:hackathonID/winners", hackathonController.getWinners); //not done

// router.get("/:hackathonID/:teamID/project", hackathonController.getProject); //done //not relevant
router.get("/:hackathonID/:projectID/team", hackathonController.getTeam); //done and more useful
router.post("/:hackathonID/createTeam", hackathonController.createTeam); //done
router.post(
  "/:hackathonID/:teamID/submitProject",
  hackathonController.createProject
); //done

//builder and sponsor routes
router.post("/:hackathonID/registerBuilder", hackathonController.createBuilder); //tested
router.get("/:hackathonID/:address", hackathonController.getBuilder); //tested

router.post("/create-nft-uri", hackathonController.createNft);

module.exports = router;
