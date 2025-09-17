import React from 'react'
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import Wrapper from "../../assets/wrappers/LogoutContainer";
import { useState } from "react";
import { useDashboardContext } from "../../pages/DashboardLayout";


const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { logoutUser, user } = useDashboardContext();
  return (
    <Wrapper>
      <button className="btn logout-btn" onClick={() => setShowLogout(!showLogout)}>
        {user.avatar ? <img src={user.avatar} alt={user.name} className="img" /> :
        <FaUserCircle />}
        <span>{user.name}</span>
        <FaCaretDown />
      </button>
      {showLogout && (
        <div className="show-dropdown dropdown">
          <button type="button" className=" btn" onClick={logoutUser}>
            Logout
          </button>
        </div>
      )}
    </Wrapper>
  )
}

export default LogoutContainer