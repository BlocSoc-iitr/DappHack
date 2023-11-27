const express = require("express");
const router = express.Router();
const hackathonController = require("../controllers/hackathonController");
//tested -- meaans postman testing completed
//done --function implementatioon completed with all handling of errors and all
router.post("/createHackathon", hackathonController.createHackathon); //done
router.get("/:hackathonID", hackathonController.getHackathon); //done

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
router.post("/:hackathonID/registerBuilder", hackathonController.createBuilder); //done
router.get("/:hackathonID/:address", hackathonController.getBuilder); //done
router.post("/:hackathonID/createSponsor", hackathonController.createSponsor); //done
router.get("/:hackathonID/sponsorDetails", hackathonController.getSponsors); //done

router.post("/create-nft-uri", hackathonController.createNft);

module.exports = router;
