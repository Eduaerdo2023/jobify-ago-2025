import Wrapper from '../wrappers/Job'
import { Form ,Link } from 'react-router-dom';
import JobInfo from "./JobInfo";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import day from "dayjs";


const Job = ({ _id, position, company, location, jobType, jobStatus, createdAt }) => {
 
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo
            icon={<FaLocationArrow />}
            text={location}
          />
           <JobInfo
            icon={<FaCalendarAlt />}
            text={day(createdAt).format("MMMM D, YYYY")}
          />
          <JobInfo
            icon={<FaBriefcase />}
            text={jobType}
          />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>

        </div>
        <footer className='actions'>
         <Link to={`/dashboard/edit-job/${_id}`} className='btn edit-btn' >Edit</Link>
         <Form method='post' action={`/dashboard/delete-job/${_id}`}>
            <button type='submit' className='btn delete-btn'>Delete</button>
         </Form>
        </footer>
      </div>
    </Wrapper>
  );
}




export default Job