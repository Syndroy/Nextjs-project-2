import * as z from "zod";

export const usernameValidation = z.string().min(2,"Username must be atleast 2 characters").max(20,"username must be no more than 20 characters").regex(/^[a-zA-Z)-9_]+$/,"Username must not contain special characters")

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string(),
    password: z.string().min(6,{message:"pasword should be atleast 6 characters"})
})
