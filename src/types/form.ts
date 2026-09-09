export type FormState = {
  currentStep: number;

  name: string;
  email: string;

  education: string;
  experience: string;

  errors: Record<string, string>; // way o define an object with keys and values of specific types.
  // details in readme.md file

  status: "idle" | "submitting" | "success" | "error";
};

export type FormAction =
  | { type: "UPDATE_NAME"; payload: string }
  | { type: "UPDATE_EMAIL"; payload: string }
  | { type: "UPDATE_EDUCATION"; payload: string }
  | { type: "UPDATE_EXPERIENCE"; payload: string }
  | { type: "NEXT_STEP" }
  | { type: "PREVIOUS_STEP" }
  | { type: "SET_ERRORS"; payload: Record<string, string> }
  | { type: "SUBMIT" }
  | { type: "SUCCESS" }
  | { type: "ERROR" }
  | { type: "RESET" };

