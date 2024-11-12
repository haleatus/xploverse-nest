import { z } from 'zod';

export const createUserSchema = z
  .object({
    full_name: z.string().min(3).max(20),
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(6).max(20),
    confirm_password: z.string().min(6).max(20),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords do not match',
  });

export type CreateUserZodDto = z.infer<typeof createUserSchema>;
