import React from "react";
import { JOB_STATUS } from "../../../../utils/constants";

const FormRowSelect = ({ list, name, labelText, onChange, defaultValue }) => {
  return (
    <div name={name} className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <select id={name} name={name} className="form-select"
      defaultValue={defaultValue}
      onChange={onChange}>
        {list.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
