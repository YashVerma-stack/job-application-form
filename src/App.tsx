import { useEffect, useReducer } from "react";
import { formReducer, initialState } from "./reducer/formReducer";
import PersonalInfo from "./components/PersonalInfo";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Review from "./components/Review";
import {
  educationSchema,
  experienceSchema,
  personalInfoSchema,
} from "./validation/formSchemas";

import "./App.css"



function validateStep(
  currentStep: number,
  state: {
    name: string;
    email: string;
    education: string;
    experience: string;
  },
) {
  const errors: Record<string, string> = {};

  if (currentStep === 1) {
    const result = personalInfoSchema.safeParse({
      name: state.name,
      email: state.email,
    });

    // console.log("ZOD RESULT: ", result)

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (typeof field === "string") {
          errors[field] = issue.message;
        }
      });
    }
    // console.log("Errors: ", errors);
  }

  if (currentStep === 2) {
    const result = educationSchema.safeParse({
      education: state.education,
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
      experience: state.experience,
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

export default function App() {
  const [state, dispatch] = useReducer(formReducer, getInitialState());

  useEffect(() => {
    localStorage.setItem("jobApplication", JSON.stringify(state));
  }, [state]);

  function handleNext() {
    const errors = validateStep(state.currentStep, state);

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
    <main className="job-form" >
      <h1>Job Application Form</h1>

      <p>Current Step: {state.currentStep}</p>

      {state.currentStep === 1 && (
        <PersonalInfo
          name={state.name}
          email={state.email}
          errors={state.errors}
          onNameChange={(value) =>
            dispatch({
              type: "UPDATE_NAME",
              payload: value,
            })
          }
          onEmailChange={(value) =>
            dispatch({
              type: "UPDATE_EMAIL",
              payload: value,
            })
          }
        />
      )}

      {state.currentStep === 2 && (
        <Education
          education={state.education}
          errors={state.errors}
          onEducationChange={(value) =>
            dispatch({
              type: "UPDATE_EDUCATION",
              payload: value,
            })
          }
        />
      )}

      {state.currentStep === 3 && (
        <Experience
          experience={state.experience}
          errors={state.errors}
          onExperienceChange={(value) =>
            dispatch({
              type: "UPDATE_EXPERIENCE",
              payload: value,
            })
          }
        />
      )}

      {state.currentStep === 4 && (
        <>
          <Review
            name={state.name}
            email={state.email}
            education={state.education}
            experience={state.experience}
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
