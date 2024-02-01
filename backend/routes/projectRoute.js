const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

router.get("/:projectID", projectController.getProject);
router.post("/create", projectController.submissionProject);
router.patch("/:projectID/:leaderId", projectController.updateProject);
router.delete("/:projectID/:leaderId", projectController.deleteProject);
router.get("/user/:userID", projectController.getAllProjectsOfaUser);
router.get("/team/:teamID", projectController.getProjectOfaTeam);

module.exports = router;
