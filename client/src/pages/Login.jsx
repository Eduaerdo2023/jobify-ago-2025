import React from "react";
import { Link, Form, redirect, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow, ButtonComponent } from "../assets/components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successful!");
    return redirect("/dashboard");
  } catch (error) {
    console.error("Login failed:", error);
    toast.error(
      error?.response?.data?.msg || "Login failed. Please try again."
    );
    return error;
  }
};

const Login = () => {
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123",
    };

    try {
      await customFetch.post("/auth/login", data);
      toast.success("Take a test drive!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error?.response?.data?.msg || "Login failed. Please try again."
      );
    
    }
  };

  return (
    <Wrapper>
      <Form className="form" method="post">
        <Logo />
        <h4>Login</h4>
        <FormRow
          name="email"
          type="email"
          
          required={true}
        />
        <FormRow
          name="password"
          type="password"
          
          required={true}
        />

        <ButtonComponent />
        <button
          type="button"
          className={`btn btn-block`}
          onClick={loginDemoUser}
        >
          explore the app
        </button>

        <p>
          Not a member?{" "}
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
