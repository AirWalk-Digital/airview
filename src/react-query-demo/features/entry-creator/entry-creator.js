import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { MetaForm } from "../meta-form";

export function EntryCreator() {
  const queryClient = useQueryClient();
  const setInitialState = () => {
    return {
      name: "",
      collection: "",
      parent: "",
      body: "",
    };
  };

  const [formData, setFormData] = useState(setInitialState());
  const [formSubmitting, setFormSubmitting] = useState(false);

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

  const handleOnFormSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitting(true);

    try {
      const response = await fetch(`/api/entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        queryClient.invalidateQueries("entries_meta");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div>
      <h3>Create Entry</h3>
      {formSubmitting ? (
        <div>Form submitting</div>
      ) : (
        <MetaForm
          formData={formData}
          onReset={handleOnFormReset}
          onChange={handleOnFormChange}
          onSubmit={handleOnFormSubmit}
        />
      )}
      <hr />
    </div>
  );
}
