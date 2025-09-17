import { ButtonComponent, FormRow, FormRowSelect } from "../assets/components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Error fetching job");
    return redirect("/dashboard/all-jobs");
  }

  return null;
};

export const action = async ({ request, params }) => {
  const jobId = params.id;
  const formData = await request.formData();
  const jobData = Object.fromEntries(formData);
  try {
    const response = await customFetch.patch(`/jobs/${jobId}`, jobData);
    toast.success("Job updated successfully!");
    return redirect(`../all-jobs`);
  } catch (error) {
    toast.error("Error updating job");
    return null;
  }
};

const EditJob = () => {
  const params = useParams();
  const data = useLoaderData();
  const jobData = data.job;
  return (
    <div>
      <h2>Edit Job</h2>
      <Wrapper>
        <Form method="post" className="form">
          <h4 className="form-title">Edit Job</h4>
          <div className="form-center">
            <FormRow
              type="text"
              name="position"
              labelText="Job Title"
              defaultValue={jobData?.position}
              required
            />
            <FormRow
              type="text"
              name="company"
              labelText="Company Name"
              defaultValue={jobData?.company}
              required
            />
            <FormRow
              type="text"
              name="location"
              labelText="Job Location"
              defaultValue={jobData?.location}
              disabled
            />
            <FormRowSelect
              name="jobStatus"
              labelText="Job Status"
              defaultValue={jobData?.jobStatus}
              list={Object.values(JOB_STATUS)}
            />
            <FormRowSelect
              name="jobType"
              labelText="Job Type"
              defaultValue={jobData?.jobType}
              list={Object.values(JOB_TYPE)}
            />
            <ButtonComponent formBtn />
          </div>
        </Form>
      </Wrapper>
    </div>
  );
};

export default EditJob;
