"use client";
import React, { useState } from "react";

export default function useDatabase() {
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
  console.log("useDatabase function called!");

  const [isloadingCreateUser, setIsloadingCreateUser] = useState(false);
  const [isloadingGetUser, setIsloadingGetUser] = useState(false);
  const [isloadingCreateSponsor, setIsloadingCreateSponsor] = useState(false);
  const [isloadingGetSponsor, setIsloadingGetSponsor] = useState(false);
  const [isloadingCreateHackathon, setIsloadingCreateHackathon] =
    useState(false);
  const [isloadingGetHackathon, setIsloadingGetHackathon] = useState(false);
  const [isloadingGetAllProjects, setIsloadingGetAllProjects] = useState(false);
  const [isloadingGetAllTeams, setIsloadingGetAllTeams] = useState(false);
  const [isloadingGetWinners, setIsloadingGetWinners] = useState(false);
  const [isloadingGetTeam, setIsloadingGetTeam] = useState(false);
  const [isloadingCreateTeam, setIsloadingCreateTeam] = useState(false);
  const [isloadingCreateProject, setIsloadingCreateProject] = useState(false);
  const [isloadingCreateBuilder, setIsloadingCreateBuilder] = useState(false);
  const [isloadingGetBuilder, setIsloadingGetBuilder] = useState(false);
  const [isloadingCreateNft, setIsloadingCreateNft] = useState(false);
  const [isloadingGetNft, setIsloadingGetNft] = useState(false);
  const [isloadingGetProject, setIsloadingGetProject] = useState(false);
  const [isloadingSubmissionProject, setIsloadingSubmissionProject] =
    useState(false);
  const [isloadingUpdateProject, setIsloadingUpdateProject] = useState(false);
  const [isloadingDeleteProject, setIsloadingDeleteProject] = useState(false);
  const [isloadingGetAllProjectsOfaUser, setIsloadingGetAllProjectsOfaUser] =
    useState(false);
  const [isloadingGetProjectOfaTeam, setIsloadingGetProjectOfaTeam] =
    useState(false);
  const [isloadingGetTeamTeam, setIsloadingGetTeamTeam] = useState(false);
  const [isloadingCreateTeamTeam, setIsloadingCreateTeamTeam] = useState(false);
  const [isloadingUpdateTeam, setIsloadingUpdateTeam] = useState(false);
  const [isloadingDeleteTeam, setIsloadingDeleteTeam] = useState(false);
  const [
    isloadingGetAllTeamsOfhackthodId,
    setIsloadingGetAllTeamsOfhackthodId,
  ] = useState(false);
  const [
    isloadingGetTeamsOfhackthodIdByPagination,
    setIsloadingGetTeamsOfhackthodIdByPagination,
  ] = useState(false);
  const [isloadingGetTeamsOfUser, setIsloadingGetTeamsOfUser] = useState(false);
  const [isloadingJoinTeamBySecretkey, setIsloadingJoinTeamBySecretkey] =
    useState(false);
  const [isloadingLeaveTeam, setIsloadingLeaveTeam] = useState(false);
  const [isloadingRemoveMemberFromTeam, setIsloadingRemoveMemberFromTeam] =
    useState(false);

  const [isloadingGetallHackathons, setIsloadingGetallHackathons] =
    useState(false);
  const [
    isloadingGetHackathonByPagination,
    setIsloadingGetHackathonByPagination,
  ] = useState(false);

  async function createUser(data) {
    console.log(data);
    try {
      setIsloadingCreateUser(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/create`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingCreateUser(false);
      return responsedata.user;
    } catch (err) {
      console.log(err);
      setIsloadingCreateUser(false);
      return "Error during user creation";
    }
  }

  async function getUser(address) {
    try {
      setIsloadingGetUser(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${address}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingGetUser(false);
      return responsedata.user;
    } catch (err) {
      console.log(err.message);
      setIsloadingGetUser(false);
      return "Error during user creation";
    }
  }

  async function createSponsor(data, hackathonID) {
    console.log(data);
    try {
      setIsloadingCreateSponsor(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/hackathon/${hackathonID}/sponsor/createSponsor`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        }
      );
      const responsedata = await response.json();
      setIsloadingCreateSponsor(false);
      console.log(responsedata);
      return responsedata.sponsor;
    } catch (err) {
      console.log(err);
      setIsloadingCreateSponsor(false);
      return "Error during sponsor creation";
    }
  }

  async function getSponsorDetails(hackathonID) {
    try {
      setIsloadingGetSponsor(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/hackathon/${hackathonID}/sponsor/sponsorDetails`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingGetSponsor(false);
      return responsedata.sponsor;
    } catch (err) {
      setIsloadingGetSponsor(false);
      console.log(err);
      return "Error during sponsor get";
    }
  }

  async function createHackathon(data) {
    console.log(data);
    try {
      setIsloadingCreateHackathon(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/hackathon/createHackathon`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingCreateHackathon(false);
      return responsedata.hackathon;
    } catch (err) {
      console.log(err);
      setIsloadingCreateHackathon(false);
      return "Error during hackathon creation";
    }
  }

  async function getHackathon(hackathonID) {
    try {
      setIsloadingGetHackathon(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/hackathon/${hackathonID}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingGetHackathon(false);
      return responsedata.hackathon;
    } catch (err) {
      console.log(err);
      setIsloadingGetHackathon(false);
      return "Error during hackathon get";
    }
  }

  async function getAllProjects(hackathonID) {
    try {
      setIsloadingGetAllProjects(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/hackathon/${hackathonID}/projects`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingGetAllProjects(false);
      return responsedata.projects;
    } catch (err) {
      setIsloadingGetAllProjects(false);
      console.log(err);
      return "Error during projects get";
    }
  }

  async function getAllTeams(hackathonID) {
    try {
      setIsloadingGetAllTeams(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/hackathon/${hackathonID}/teams`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingGetAllTeams(false);
      return responsedata.teamsData;
    } catch (err) {
      console.log(err);
      setIsloadingGetAllTeams(false);
      return "Error during teams get";
    }
  }

  async function getWinners(hackathonID) {
    try {
      setIsloadingGetWinners(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/hackathon/${hackathonID}/winners`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingGetWinners(false);
      return responsedata.winners;
    } catch (err) {
      console.log(err);
      setIsloadingGetWinners(false);
      return "Error during winners get";
    }
  }

  async function getTeam(hackathonID, projectID) {
    try {
      setIsloadingGetTeam(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/hackathon/${hackathonID}/${projectID}/team`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingGetTeam(false);
      return responsedata.team;
    } catch (err) {
      console.log(err);
      setIsloadingGetTeam(false);
      return "Error during team get";
    }
  }

  async function createTeam(data, hackathonID) {
    console.log(data);
    try {
      setIsloadingCreateTeam(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/hackathon/${hackathonID}/createTeam`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        }
      );
      const responsedata = await response.json();
      setIsloadingCreateTeam(false);
      console.log(responsedata);
      return responsedata.team;
    } catch (err) {
      console.log(err);
      setIsloadingCreateTeam(false);
      return "Error during team creation";
    }
  }

  async function createProject(data, hackathonID, teamID) {
    console.log(data);
    try {
      setIsloadingCreateProject(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/hackathon/${hackathonID}/${teamID}/submitProject`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingCreateProject(false);
      return responsedata.project;
    } catch (err) {
      console.log(err);
      setIsloadingCreateProject(false);
      return null;
    }
  }

  async function createBuilder(data, hackathonID) {
    console.log(data);
    try {
      setIsloadingCreateBuilder(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/hackathon/${hackathonID}/registerBuilder`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingCreateBuilder(false);
      return responsedata.builder;
    } catch (err) {
      console.log(err);
      setIsloadingCreateBuilder(false);
      return "Error during builder creation";
    }
  }

  async function getBuilder(hackathonID, address) {
    try {
      setIsloadingGetBuilder(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/hackathon/${hackathonID}/${address}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingGetBuilder(false);
      return responsedata.builder;
    } catch (err) {
      console.log(err);
      setIsloadingGetBuilder(false);
      return "Error during builder get";
    }
  }

  async function createNft(data) {
    console.log(data);
    try {
      setIsloadingCreateNft(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/hackathon/create-nft-uri`,
        {
          method: "POST",
          body: formData,
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingCreateNft(false);
      return responsedata.Uri;
    } catch (err) {
      console.log(err);
      setIsloadingCreateNft(false);
      return null;
    }
  }

  async function getNft(nftID) {
    try {
      setIsloadingGetNft(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/nft/${nftID}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingGetNft(false);
      return responsedata.nft;
    } catch (err) {
      console.log(err);
      setIsloadingGetNft(false);
      return "Error during nft get";
    }
  }

  async function getProject(projectID) {
    try {
      setIsloadingGetProject(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/project/${projectID}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const responsedata = await response.json();
      setIsloadingGetProject(false);
      console.log(responsedata);
      return responsedata.project;
    } catch (err) {
      console.log(err);
      setIsloadingGetProject(false);
      return {
        name: "Error during project get name",
        description: "Error during project get description",
      };
    }
  }

  async function submissionProject(data) {
    console.log(data);
    try {
      setIsloadingSubmissionProject(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/project/create`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingSubmissionProject(false);
      return responsedata.project;
    } catch (err) {
      setIsloadingSubmissionProject(false);
      console.log(err);
      return "Error during project submission";
    }
  }

  async function updateProject(data, projectID, leaderId) {
    console.log(data);
    try {
      setIsloadingUpdateProject(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/project/${projectID}/${leaderId}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        }
      );
      const responsedata = await response.json();
      setIsloadingUpdateProject(false);
      console.log(responsedata);
      return responsedata.project;
    } catch (err) {
      console.log(err);
      setIsloadingUpdateProject(false);
      return "Error during project update";
    }
  }

  async function deleteProject(projectID, leaderId) {
    setIsloadingDeleteProject(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/project/${projectID}/${leaderId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingDeleteProject(false);
      return responsedata.project;
    } catch (err) {
      console.log(err);
      setIsloadingDeleteProject(false);
      return "Error during project deletion";
    }
  }

  async function getAllProjectsOfaUser(userID) {
    try {
      setIsloadingGetAllProjectsOfaUser(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/project/user/${userID}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingGetAllProjectsOfaUser(false);
      return responsedata.projects;
    } catch (err) {
      console.log(err);
      setIsloadingGetAllProjectsOfaUser(false);
      return "Error during projects get";
    }
  }

  async function getProjectOfaTeam(teamID) {
    try {
      setIsloadingGetProjectOfaTeam(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/project/team/${teamID}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingGetProjectOfaTeam(false);
      return responsedata.projects;
    } catch (err) {
      console.log(err);
      setIsloadingGetProjectOfaTeam(false);
      return "Error during projects get";
    }
  }

  async function getTeamTeam(teamID) {
    try {
      setIsloadingGetTeamTeam(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team/${teamID}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingGetTeamTeam(false);
      return responsedata.team;
    } catch (err) {
      console.log(err);
      setIsloadingGetTeamTeam(false);
      return "Error during team get";
    }
  }

  async function createTeamTeam(data) {
    console.log(data);
    try {
      setIsloadingCreateTeamTeam(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team/create`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        }
      );
      const responsedata = await response.json();
      setIsloadingCreateTeamTeam(false);
      console.log(responsedata);
      return responsedata.team;
    } catch (err) {
      console.log(err);
      setIsloadingCreateTeamTeam(false);
      return "Error during team creation";
    }
  }

  async function updateTeam(data, teamID, userID) {
    console.log(data);
    try {
      setIsloadingUpdateTeam(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team/${teamID}/${userID}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        }
      );
      const responsedata = await response.json();
      setIsloadingUpdateTeam(false);
      console.log(responsedata);
      return responsedata.team;
    } catch (err) {
      console.log(err);
      setIsloadingUpdateTeam(false);
      return "Error during team update";
    }
  }

  async function deleteTeam(teamID, userID) {
    setIsloadingDeleteTeam(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team/${teamID}/${userID}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingDeleteTeam(false);
      return responsedata.team;
    } catch (err) {
      console.log(err);
      setIsloadingDeleteTeam(false);
      return "Error during team deletion";
    }
  }

  async function getAllTeamsOfhackthodId(hackathonID) {
    try {
      setIsloadingGetAllTeamsOfhackthodId(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team/hackthod/${hackathonID}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingGetAllTeamsOfhackthodId(false);
      return responsedata.teams;
    } catch (err) {
      console.log(err);
      setIsloadingGetAllTeamsOfhackthodId(false);
      return "Error during teams get";
    }
  }

  async function getTeamsOfhackthodIdByPagination(hackathonID, page) {
    try {
      setIsloadingGetTeamsOfhackthodIdByPagination(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team/hackthod/${hackathonID}/pagination?page=${page}?limit=5`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingGetTeamsOfhackthodIdByPagination(false);
      return responsedata.teams;
    } catch (err) {
      console.log(err);
      setIsloadingGetTeamsOfhackthodIdByPagination(false);
      return "Error during teams get";
    }
  }

  async function getTeamsOfUser(userID) {
    try {
      setIsloadingGetTeamsOfUser(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team/user/${userID}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingGetTeamsOfUser(false);
      return responsedata.teams;
    } catch (err) {
      console.log(err);
      setIsloadingGetTeamsOfUser(false);
      return "Error during teams get";
    }
  }

  async function joinTeamBySecretkey(secretkey, userID) {
    try {
      setIsloadingJoinTeamBySecretkey(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team/join/${secretkey}/${userID}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingJoinTeamBySecretkey(false);
      return responsedata.team;
    } catch (err) {
      console.log(err);
      setIsloadingJoinTeamBySecretkey(false);
      return "Error during team join";
    }
  }

  async function leaveTeam(teamID, userID) {
    setIsloadingLeaveTeam(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team/leave/${teamID}/${userID}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingLeaveTeam(false);
      return responsedata.team;
    } catch (err) {
      console.log(err);
      setIsloadingLeaveTeam(false);
      return "Error during team leave";
    }
  }

  async function removeMemberFromTeam(teamID, userID, leaderID) {
    setIsloadingRemoveMemberFromTeam(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team/remove/${teamID}/member/${userID}/${leaderID}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingRemoveMemberFromTeam(false);
      return responsedata.team;
    } catch (err) {
      console.log(err);
      setIsloadingRemoveMemberFromTeam(false);
      return "Error during team remove member";
    }
  }

  async function allHackathons() {
    try {
      setIsloadingGetallHackathons(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/hackathon/allHackathons`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingGetallHackathons(false);
      return responsedata.hackathons;
    } catch (err) {
      console.log(err);
      setIsloadingGetallHackathons(false);
      return [];
    }
  }

  async function getHackathonByPagination(page, limit) {
    try {
      setIsloadingGetHackathonByPagination(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/hackathon/getHackathonByPagination?page=${page}?limit=${limit}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const responsedata = await response.json();
      console.log(responsedata);
      setIsloadingGetHackathonByPagination(false);
      return responsedata.hackathons;
    } catch (err) {
      setIsloadingGetHackathonByPagination(false);
      console.log(err);
      return "Error during hackathons get";
    }
  }

  return {
    createUser,
    getUser,
    createSponsor,
    getSponsorDetails,
    createHackathon,
    getHackathon,
    getAllProjects,
    getAllTeams,
    getWinners,
    getTeam,
    createTeam,
    createProject,
    createBuilder,
    getBuilder,
    createNft,
    getNft,
    getProject,
    submissionProject,
    updateProject,
    deleteProject,
    getAllProjectsOfaUser,
    getProjectOfaTeam,
    getTeamTeam,
    createTeamTeam,
    updateTeam,
    deleteTeam,
    getAllTeamsOfhackthodId,
    getTeamsOfhackthodIdByPagination,
    getTeamsOfUser,
    joinTeamBySecretkey,
    leaveTeam,
    removeMemberFromTeam,
    allHackathons,
    getHackathonByPagination,
    isloadingCreateUser,
    isloadingGetUser,
    isloadingCreateSponsor,
    isloadingGetSponsor,
    isloadingCreateHackathon,
    isloadingGetHackathon,
    isloadingGetAllProjects,
    isloadingGetAllTeams,
    isloadingGetWinners,
    isloadingGetTeam,
    isloadingCreateTeam,
    isloadingCreateProject,
    isloadingCreateBuilder,
    isloadingGetBuilder,
    isloadingCreateNft,
    isloadingGetNft,
    isloadingGetProject,
    isloadingSubmissionProject,
    isloadingUpdateProject,
    isloadingDeleteProject,
    isloadingGetAllProjectsOfaUser,
    isloadingGetProjectOfaTeam,
    isloadingGetTeamTeam,
    isloadingCreateTeamTeam,
    isloadingUpdateTeam,
    isloadingDeleteTeam,
    isloadingGetAllTeamsOfhackthodId,
    isloadingGetTeamsOfhackthodIdByPagination,
    isloadingGetTeamsOfUser,
    isloadingJoinTeamBySecretkey,
    isloadingLeaveTeam,
    isloadingRemoveMemberFromTeam,
    isloadingGetallHackathons,
    isloadingGetHackathonByPagination,
  };
}
