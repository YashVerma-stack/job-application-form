import {z} from "zod";

export const personalInfoSchema = z.object({
    name: z.string().min(1, "Name is required").regex(/^[A-Za-z ]+$/, "Name can only contain letters"),  // we use one to put atleast single character instead an empty string
    email: z.email("Please enter a valid email"),  // this value must bs a valid email address it put the checks that hello, hello@, @gmail.com it will reject  these type of input 
})


// .regex(/^[A-Za-z ]+$/, "Name can only contain letters") -> allow uppercase, lowercase and spaces letters

export const educationSchema = z.object({
    education: z.string().min(1, "Education is required"),
});


export const experienceSchema = z.object({
    experience: z.string().min(1, "Education is required"),
});





