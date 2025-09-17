import React from "react";

import StatItem from "./StatItem";
import Wrapper from "../wrappers/StatsContainer";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
Wrapper;

const StatsContainer = ({ stats }) => {
  return (
    <Wrapper>
      <StatItem
        title="pending"
        count={stats.pending}
        icon={<FaSuitcaseRolling />}
        color="#f59e0b"
        bcg="#fef3c7"
      />
      <StatItem
        title="interview"
        count={stats.interview}
        icon={<FaCalendarCheck />}
        color="#647acb"
        bcg="#e0e8f9"
      />
      <StatItem
        title="declined"
        count={stats.declined}
        icon={<FaBug />}
        color="#d66a6a"
        bcg="#ffeeee"
      />
    </Wrapper>
  );
};

export default StatsContainer;
