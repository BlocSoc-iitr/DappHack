import { useState } from "react";

const useGetHackProject = () => {
  const [isLoading, setIsLoading] = useState(false);

  const GetHackProject = async (wallet, projectid) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/hackathon/project/${wallet}/${projectid}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responsedata = await response.json();
      setIsLoading(false);
      return responsedata.response;
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      return [
        {
          projectName: "Project 1",
          teamName: "Team 1",
          teamMembers: ["user1", "user2", "user3", "user4"],
          description:
            "Hackthon is a great place to learn and build new things. We are a team of 4 members and we are building a project on blockchain.",
          link: "/project/1",
        },
        {
          projectName: "Project 2",
          teamName: "Team 2",
          teamMembers: ["user1", "user2", "user3", "user4"],
          description:
            "Hackthon is a great place to learn and build new things. We are a team of 4 members and we are building a project on blockchain.",
          link: "/project/2",
        },
        {
          projectName: "Project 3",
          teamName: "Team 3",
          teamMembers: ["user1", "user2", "user3", "user4"],
          description:
            "Hackthon is a great place to learn and build new things. We are a team of 4 members and we are building a project on blockchain.",
          link: "/project/3",
        },
        {
          projectName: "Project 4",
          teamName: "Team 4",
          teamMembers: ["user1", "user2", "user3", "user4"],
          description:
            "Hackthon is a great place to learn and build new things. We are a team of 4 members and we are building a project on blockchain.",
          link: "/project/4",
        },
      ];
    }
  };
  return { GetHackProject, isLoading };
};

export default useGetHackProject;
