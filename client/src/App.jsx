import React from "react";

import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  AllJobs,
  Profile,
  Stats,
  Admin,
  EditJob,
} from "./pages";

import { action as registerAction } from "./pages/Register.jsx";
import { action as loginAction } from "./pages/Login.jsx";
import { loader as dashboardLoader } from "./pages/DashboardLayout.jsx";
import { action as EditJobAction } from "./pages/EditJob.jsx";
import { action as addJobAction } from "./pages/AddJob.jsx";
import { action as deleteJobAction } from "./pages/DeleteJob.jsx";
import { action as profileAction } from "./pages/Profile.jsx";
import { loader as AllJobsLoader } from "./pages/AllJobs.jsx";
import { loader as EditJobLoader } from "./pages/EditJob.jsx";
import { loader as AdminLoader } from "./pages/Admin.jsx";
import {loader as StatsLoader} from "./pages/Stats.jsx"

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};
const isDarkThemeEnabled = checkDefaultTheme();
document.body.classList.toggle("dark-theme", isDarkThemeEnabled);
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: AllJobsLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: StatsLoader,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: AdminLoader,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: EditJobLoader,
            action: EditJobAction,
          },
          { path: "delete-job/:id", action: deleteJobAction },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
