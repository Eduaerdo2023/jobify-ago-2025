import Job from "./Job";
import Wrapper from "../wrappers/JobsContainer";
import { useAllJobsContext } from "../../pages/AllJobs";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs, totalJobs, numOfPages } = data;

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2> No Jobs Found</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5> {totalJobs} {totalJobs > 1 ? "Jobs Found" : "Job Found"}</h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>  
      {numOfPages > 1 && <PageBtnContainer /> }
    </Wrapper>
  );
};

export default JobsContainer;
