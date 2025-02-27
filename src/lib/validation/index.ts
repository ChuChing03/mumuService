import { z } from "zod";

const PasswordValidation = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(24, { message: "Password must be at most 24 characters long" })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
    {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }
  );

export const SignUpValidation = z
  .object({
    nickname: z
      .string()
      .min(2, { message: "Nickname must be at least 2 characters long" })
      .max(20, { message: "Nickname must be at most 20 characters long" }),
    username: z
      .string()
      .min(8, { message: "Username must be at least 8 characters long" })
      .max(24, { message: "Username must be at most 24 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: PasswordValidation,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const SignInValidation = z.object({
  username: z
    .string()
    .min(8, { message: "Username must be at least 8 characters long" })
    .max(24, { message: "Username must be at most 24 characters long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(24, { message: "Password must be at most 24 characters long" }),
});
