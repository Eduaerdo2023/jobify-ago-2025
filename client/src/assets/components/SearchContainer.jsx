import { FormRow, FormRowSelect, ButtonComponent } from ".";
import Wrapper from "../wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../../../utils/constants";
import { useAllJobsContext } from "../../pages/AllJobs";

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext();
  const { search, jobStatus, jobType, sort } = searchValues;
  const submit = useSubmit();

  const debounce = (onChange) => {
   let timeout
   return (e) => {
    const form = e.currentTarget.form
      clearTimeout(timeout)
      timeout = setTimeout(() => {
         onChange(form)
      }, 2000)
   }
  }

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">Search Jobs</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            name="sort"
            list={Object.values(JOB_SORT_BY)}
            labelText="Sort By"
            defaultValue={sort}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            list={["all", ...Object.values(JOB_STATUS)]}
            name="jobStatus"
            labelText="Job Status"
            defaultValue={jobStatus}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            list={["all", ...Object.values(JOB_TYPE)]}
            name="jobType"
            labelText="Job Type"
            defaultValue={jobType}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
