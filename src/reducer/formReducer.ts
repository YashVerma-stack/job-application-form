import type { FormAction, FormState } from "../types/form";

export const initialState: FormState = {
    currentStep: 1,
    name: "",
    email: "",
    education: "",
    experience: "",
    errors: {},
    status: "idle",
};

export function formReducer (
    state: FormState,
    action: FormAction
): FormState {
    switch (action.type) {
        case "UPDATE_NAME":
            return {
                ...state,
                name: action.payload,
            };
        case "UPDATE_EMAIL":
            return {
                ...state,
                email: action.payload
            };
        case "UPDATE_EDUCATION":
            return {
                ...state,
                education: action.payload,
            };
        case "UPDATE_EXPERIENCE":
            return {
                ...state,
                experience: action.payload,
            };
        case "NEXT_STEP":
            return {
                ...state,
                currentStep: Math.min(state.currentStep + 1, 4),
            }
        case "PREVIOUS_STEP":
            return {
                ...state,
                currentStep: Math.max(state.currentStep - 1, 1),
            };
        case "SET_ERRORS":
            return {
                ...state,
                errors: action.payload,
            };
        case "SUBMIT":
            return {
                ...state,
                status: "submitting",
            };
        case "SUCCESS":
            return {
                ...state,
                status: "success",
            }
        case "ERROR":
            return {
                ...state,
                status: "error",
            }
        case "RESET":
            return initialState;

        default:
            return state;
    }
}