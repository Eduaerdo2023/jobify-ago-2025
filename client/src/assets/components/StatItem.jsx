import Wrapper from "../wrappers/StatItem";

const StatItem = ({ title, count, icon, color, bcg }) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <header>
        <h5 className="title">{title}</h5>
      </header>
    </Wrapper>
  );
};

export default StatItem;
