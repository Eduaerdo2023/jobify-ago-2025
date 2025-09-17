import React, { createContext, useContext, useState } from "react";
import { Outlet, useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import BigSidebar from "../assets/components/BigSidebar";
import SmallSidebar from "../assets/components/SmallSidebar";
import Wrapper from "../assets/wrappers/Dashboard";
import { Navbar } from "../assets/components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

// Create a context
export const DashboardContext = createContext();

export const loader = async () => {
  const { data } = await customFetch("/users/current-user");
 
  return data;
};

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const isPageLoading = useNavigation().state === "loading";
  

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logout successful!");
    // Perform logout logic here
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">

              { isPageLoading ? <h1>Loading...</h1> : <Outlet context={{ user }} /> }
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
