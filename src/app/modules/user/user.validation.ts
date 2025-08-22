import z from "zod";
import { IsActive, Role } from "./user.interface";



// zod user validate
export const createUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "Name must be at least 2 char long." })
    .max(50, { message: "Name cannot exceed 50 char." }),

  email: z
    .string({ invalid_type_error: "Email must be string" })
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 char long." })
    .max(100, { message: "Email cannot exceed 100 char." }),

  password: z
    .string({ invalid_type_error: "Password must be string" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter.",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password must contain at least one number.",
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: "Password must contain at least one special character.",
    }),

 phone: z
    .string({ invalid_type_error: "Phone Number must be string" })
    .regex(/^\+8801[3-9]\d{8}$/, {
      message:
        "Phone number must be a valid Bangladeshi number (e.g. +8801712345678).",
    })
    .optional(),

  address: z
    .string({ invalid_type_error: "Address must be string" })
    .max(200, { message: "Address cannot exceed 200 char." })
    .optional(),
});




    // zod update schema  
export const updateUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "Name must be at least 2 char long." })
    .max(50, { message: "Name cannot exceed 50 char." })
    .optional(),

  password: z
    .string({ invalid_type_error: "Password must be string" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter.",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password must contain at least one number.",
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: "Password must contain at least one special character.",
    })
    .optional(),

 phone: z
    .string({ invalid_type_error: "Phone Number must be string" })
    .regex(/^\+8801[3-9]\d{8}$/, {
      message:
        "Phone number must be a valid Bangladeshi number (e.g. +8801712345678).",
    })
    .optional(),

  role:z
  .enum(Object.values(Role) as [string])
  .optional(),

  isActive:z
  .enum(Object.values(IsActive) as [string])
  .optional(),

  isDeleted:z
  .boolean({ invalid_type_error:"isDeleted must be true or false"})
  .optional(),

  isVerified:z
  .boolean({invalid_type_error:"isVerified must be true or false"})
  .optional(),

  address: z
    .string({ invalid_type_error: "Address must be string" })
    .max(200, { message: "Address cannot exceed 200 char." })
    .optional(),
});

