import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";


export const action = async ({ params }) => {
  const jobId = params.id;
  try {
    await customFetch.delete(`/jobs/${jobId}`);
    toast.success("Job deleted successfully!");
  } catch (error) {
    toast.error("Error deleting job");
  }
  return redirect("/dashboard/all-jobs");
};

