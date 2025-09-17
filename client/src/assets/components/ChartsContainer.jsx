import React, { useState } from "react";
import Wrapper from "../wrappers/ChartsContainer";
import BarChartComponent from "./BarChart";
import AreaChartComponent from "./AreaChart";

const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <div>Monthly Application</div>
      <button onClick={() => setBarChart(!barChart)}>
        {barChart ? "Switch to Area Chart" : "Switch to Bar Chart"}
      </button>

      {barChart ? (
      <BarChartComponent data={data} />
      ) : (
       <AreaChartComponent data={data} />
      )}
    </Wrapper>
  );
};

export default ChartsContainer;
