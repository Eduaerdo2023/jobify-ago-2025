import React from "react";
import { Link, Form,  redirect } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow, ButtonComponent } from "../assets/components";
import customFetch from "../utils/customFetch";
import { toast } from 'react-toastify';
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful!");
    return redirect("/login");
  } catch (error) {
    console.log(error);
    
    toast.error(error.response?.data?.msg || "Something went wrong");
    return error;
  }
};

const Register = () => {
  
  return (
    <Wrapper>
      <Form className="form" method="POST">
        <Logo />
        <h4>Register</h4>

        <FormRow
          name="name"
          text="Name"
          type="text"
          required={true}
        
        />
        <FormRow
          name="last Name"
          text="Last Name"
          type="text"
          
          required={true}
        />
        <FormRow
          name="email"
          text="Email"
          type="email"
         
          required={true}
        />
        <FormRow
          name="location"
          type="text"
         
          required={true}
        />
        <FormRow
          name="password"
          text="Password"
          type="password"
         
          required={true}
        />
        <ButtonComponent />
        <p>
          Already a member?{" "}
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
