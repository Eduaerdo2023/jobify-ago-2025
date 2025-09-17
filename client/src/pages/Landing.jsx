
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";
import { Logo } from "../assets/components";


const Landing = () => {

  return (
    <Wrapper>
      <nav>
  <Logo />
      </nav>

      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            Create a job tracking application using the MERN stack. This
            application will allow users to create, read, update, and delete job
            postings.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn ">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="Hero" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
