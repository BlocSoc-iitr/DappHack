import { useState } from "react";

const useGetHackTimeline = () => {
  const [isLoading, setIsLoading] = useState(false);
  const GetHackTimeline = async (wallet, projectid) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/hackathon/timeline/${wallet}/${projectid}`,
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
          time: "April 23, 2023",
          description:
            "rojects Live before Judges, along with Pitching of their Idea, Presentation for Win",
        },
        {
          time: "April 23, 2023",
          description:
            "rojects Live before Judges, along with Pitching of their Idea, Presentation for Win",
        },
        {
          time: "April 23, 2023",
          description:
            "rojects Live before Judges, along with Pitching of their Idea, Presentation for Win",
        },
        {
          time: "April 23, 2023",
          description:
            "rojects Live before Judges, along with Pitching of their Idea, Presentation for Win",
        },
      ];
    }
  };
  return { GetHackTimeline, isLoading };
};

export default useGetHackTimeline;
