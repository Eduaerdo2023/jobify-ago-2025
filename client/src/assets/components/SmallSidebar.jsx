import { useDashboardContext } from "../../pages/DashboardLayout";
import links from "../../utils/links";
import Wrapper from "../wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {
  const { toggleSidebar, showSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar ? "show-sidebar" : ""}`}>
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="nav-links">
            <NavLinks />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
