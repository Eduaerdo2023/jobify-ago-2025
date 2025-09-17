import { ButtonComponent, FormRow, FormRowSelect } from "../assets/components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => { 
  const formData = await request.formData();
  const data= Object.fromEntries(formData);
  
  try {
    await customFetch.post("/jobs", data)
    toast.success("Job added successfully!");
    return redirect("all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Failed to add job.");
    return null;
  }
};

const AddJob = () => {
  const { user } = useOutletContext();  
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add Job</h4>
        <div className="form-center">
          <FormRow type='text' name="position"/>
          <FormRow type='text' name="company"/>
          <FormRow type='text' name="location" labelText="Job Location"  defaultValue={user.location} />
         
          <FormRowSelect list={Object.values(JOB_STATUS)} name='status' labelText= 'Job Status'/>
          <FormRowSelect list={Object.values(JOB_TYPE)} name='type' labelText= 'Job Type'  />

          <ButtonComponent formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
