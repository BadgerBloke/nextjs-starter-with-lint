import { z } from 'zod/v4';

export const schema = z
    .object({
        email: z.email({ message: 'Please provide valid email' }).max(156, { message: 'Email is too long' }),
        password: z
            .string({ message: 'Password is required' })
            .min(8, { message: 'Password must be at least 8 characters' })
            .max(18, { message: 'Password is too long' }),
        confirm: z.string({ message: 'Password confirmation is required' }),
    })
    .refine(({ password, confirm }) => password !== confirm, {
        message: 'Confirm password does not match with password',
        path: ['confirm'],
    });
