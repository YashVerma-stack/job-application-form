import type { FormSchema } from "../types/jsonSchema";

export const formSchema: FormSchema = {
  personalInfo: {
    type: "object",
    label: "Personal Information",

    properties: {
      name: {
        type: "text",
        label: "Full Name",
      },

      email: {
        type: "email",
        label: "Email Address",
      },

      address: {
        type: "object",
        label: "Address",

        properties: {
          city: {
            type: "text",
            label: "City",
          },

          country: {
            type: "text",
            label: "Country",
          },
        },
      },
    },
  },

  education: {
    type: "object",
    label: "Education",

    properties: {
      education: {
        type: "text",
        label: "Education",
      },
    },
  },

  experience: {
    type: "object",
    label: "Experience",

    properties: {
      experience: {
        type: "text",
        label: "Experience",
      },
    },
  },
};
