import React, { useState } from "react";
import "./Form.css";

const Form = ({ title, fields, handleSubmit, isLoading }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.id]: "" }, {}))
  );

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    await handleSubmit(formData);
  };

  return (
    <div className="card form-card">
      <form onSubmit={handleSubmitClick}>
        <h3 className="mb-3">{title}</h3>
        {fields.map((field) => (
          <div className="mb-3" key={field.id}>
            <label htmlFor={field.id} className="form-label">
              {field.label}
            </label>
            <input
              type={field.type}
              className="form-control"
              id={field.id}
              autoComplete={field.autoComplete}
              onChange={handleInputChange}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {title}
        </button>
      </form>
    </div>
  );
};

export default Form;
