const express = require("express");
const router = express.Router();
const hackathonController = require("../controllers/hackathonController");

const sponsorController = require("../controllers/sponsorController");
router.post(
  "/:hackathonID/sponsor/createSponsor",
  sponsorController.createSponsor
);
router.get(
  "/:hackathonID/sponsor/sponsorDetails",
  sponsorController.getSponsors
);

//we can write stratTime ,endTime constraints for every function if needed
router.post("/createHackathon", hackathonController.createHackathon);
router.get("/allHackathons", hackathonController.getAllHackathon);
router.get(
  "/getHackathonByPagination",
  hackathonController.getHackathonByPagination
);
router.get("/:hackathonID", hackathonController.getHackathon);

router.get("/:hackathonID/projects", hackathonController.getAllProjects);
router.get("/:hackathonID/teams", hackathonController.getAllTeams);
router.get("/:hackathonID/winners", hackathonController.getWinners); //not done

// router.get("/:hackathonID/:teamID/project", hackathonController.getProject); //done //not relevant
router.get("/:hackathonID/:projectID/team", hackathonController.getTeam);
router.post("/:hackathonID/createTeam", hackathonController.createTeam);
router.post(
  "/:hackathonID/:teamID/submitProject",
  hackathonController.createProject
);

router.post("/:hackathonID/registerBuilder", hackathonController.createBuilder);
router.get("/:hackathonID/:address", hackathonController.getBuilder);

router.post("/create-nft-uri", hackathonController.createNft);

module.exports = router;
