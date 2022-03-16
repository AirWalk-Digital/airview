import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { MetaForm } from "../meta-form";

export function EntryCreator() {
  const setInitialState = () => {
    return {
      name: "",
      collection: "",
      parent: "",
      body: "",
    };
  };

  const [formData, setFormData] = useState(setInitialState());

  const handleOnFormChange = (event) => {
    setFormData((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const handleOnFormReset = (event) => {
    event.preventDefault();

    setFormData(setInitialState());
  };

  return (
    <div>
      <h3>Create Entry</h3>
      <div>Error reporter here</div>
      <hr />
      <MetaForm
        formData={formData}
        onReset={handleOnFormReset}
        onChange={handleOnFormChange}
        onSubmit={() => {}}
      />
      <hr />
    </div>
  );
}
