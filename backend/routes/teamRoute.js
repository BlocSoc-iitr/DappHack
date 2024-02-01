const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

router.get("/:teamID", teamController.getTeam);
router.post("/create", teamController.createTeam);
router.patch("/:teamID/:userID", teamController.updateTeam);
router.delete("/:teamID/:userID", teamController.deleteTeam);
router.get("/hackthod/:hackthodID", teamController.getAllTeamsOfhackthodId);
router.get(
  "/hackthod/:hackthodID/pagination",
  teamController.getTeamsOfhackthodIdByPagination
);
router.get("/user/:userID", teamController.getTeamsOfUser);
router.patch("/join/:secretkey/:userID", teamController.joinTeamBySecretkey);
router.patch("/leave/:teamID/:userID", teamController.leaveTeam);
router.patch(
  "/remove/:teamID/member/:userID/:leaderID",
  teamController.removeMemberFromTeam
);

module.exports = router;
