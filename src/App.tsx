import { useEffect, useReducer, useState } from "react";
import "./App.css";

import { formReducer, initialState } from "./reducer/formReducer";


import Review from "./components/Review";
import DynamicForm from "./components/DynamicForm";

import {
  educationSchema,
  experienceSchema,
  personalInfoSchema,
} from "./validation/formSchemas";

import { formSchema } from "./schema/formSchema";
import type { ObjectSchema } from "./types/jsonSchema";

function validateStep(
  currentStep: number,
  state: {
    name: string;
    email: string;
    education: string;
    experience: string;
  },
  dynamicFormData: Record<string, unknown>,
) {
  const errors: Record<string, string> = {};

  if (currentStep === 1) {
    const result = personalInfoSchema.safeParse({
      name: dynamicFormData.name,
      email: dynamicFormData.email,
    });

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (typeof field === "string") {
          errors[field] = issue.message;
        }
      });
    }
  }

  if (currentStep === 2) {
    const result = educationSchema.safeParse({
      education: dynamicFormData.education,
    });

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (typeof field === "string") {
          errors[field] = issue.message;
        }
      });
    }
  }

  if (currentStep === 3) {
    const result = experienceSchema.safeParse({
      experience: dynamicFormData.experience,
    });

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (typeof field === "string") {
          errors[field] = issue.message;
        }
      });
    }
  }

  return errors;
}

function getInitialState() {
  const savedState = localStorage.getItem("jobApplication");

  if (savedState) {
    return JSON.parse(savedState);
  }

  return initialState;
}

const stepSchemas = [
  formSchema.personalInfo as ObjectSchema,
  formSchema.education as ObjectSchema,
  formSchema.experience as ObjectSchema,
];

export default function App() {
  const [state, dispatch] = useReducer(formReducer, getInitialState());

  const [dynamicFormData, setDynamicFormData] = useState<Record<string, any>>({
    name: "",
    email: "",
    education: "",
    experience: "",
    address: {
      city: "",
      country: "",
    },

  });

  useEffect(() => {
    localStorage.setItem("jobApplication", JSON.stringify(state));
  }, [state]);

  function handleDynamicFormChange(fieldName: string, value: string) {
    setDynamicFormData((previousData) => {
      const updatedData = { ...previousData };

      const path = fieldName.split(".");

      if (path.length === 1) {
        updatedData[fieldName] = value;
        return updatedData;
      }

      let current: Record<string, any> = updatedData;

      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];

        if (!current[key]) {
          current[key] = {};
        }

        current = current[key];
      }

      current[path[path.length - 1]] = value;

      return updatedData;
    });

    if (fieldName === "name") {
      dispatch({
        type: "UPDATE_NAME",
        payload: value,
      });
    }

    if (fieldName === "email") {
      dispatch({
        type: "UPDATE_EMAIL",
        payload: value,
      });
    }

    if (fieldName === "education") {
      dispatch({
        type: "UPDATE_EDUCATION",
        payload: value,
      });
    }

    if (fieldName === "experience") {
      dispatch({
        type: "UPDATE_EXPERIENCE",
        payload: value,
      });
    }
  }

  function handleNext() {
    const errors = validateStep(state.currentStep, state, dynamicFormData);

    if (Object.keys(errors).length > 0) {
      dispatch({
        type: "SET_ERRORS",
        payload: errors,
      });

      return;
    }

    dispatch({
      type: "SET_ERRORS",
      payload: {},
    });

    dispatch({
      type: "NEXT_STEP",
    });
  }

  function handleSubmit() {
    dispatch({
      type: "SUBMIT",
    });

    setTimeout(() => {
      dispatch({
        type: "SUCCESS",
      });
    }, 1000);
  }

  return (
    <main className="job-form">
      <h1>Job Application Form</h1>

      {state.currentStep <= 3 && (
        <DynamicForm
          schema={stepSchemas[state.currentStep - 1].properties}
          formData={dynamicFormData}
          onChange={handleDynamicFormChange}
          errors={state.errors}
        />
      )}

      <p>Current Step: {state.currentStep}</p>

      

      

      
      {state.currentStep === 4 && (
        <>
          <Review
            name={state.name}
            email={state.email}
            education={state.education}
            experience={state.experience}
            address={dynamicFormData.address as {
              city: string;
              country: string;
            }}
          />

          <button onClick={handleSubmit}>Submit Application</button>
        </>
      )}

      {state.status === "success" && (
        <section>
          <h2>Application Submitted!</h2>

          <p>Your job application has been submitted successfully.</p>

          <button
            onClick={() =>
              dispatch({
                type: "RESET",
              })
            }
          >
            Start New Application
          </button>
        </section>
      )}

      {state.status !== "success" && (
        <>
          <br />

          <button onClick={handleNext} disabled={state.currentStep === 4}>
            Next Step
          </button>

          <button
            onClick={() =>
              dispatch({
                type: "PREVIOUS_STEP",
              })
            }
            disabled={state.currentStep === 1}
          >
            Previous Step
          </button>
        </>
      )}
    </main>
  );
}
