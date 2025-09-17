import React from "react";
import { ChartsContainer, StatsContainer } from "../assets/components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const resp = await customFetch.get("/jobs/stats");
    return resp.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const Stats = () => {
  const { stats, monthlyApplications } = useLoaderData();

  return (
    <>
      <StatsContainer stats={stats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};

export default Stats;
