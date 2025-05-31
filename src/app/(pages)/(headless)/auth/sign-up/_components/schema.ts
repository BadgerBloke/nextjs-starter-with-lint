import { z } from 'zod/v4';

export const schema = z
    .object({
        firstName: z
            .string({ message: 'First name is required' })
            .min(2, { message: 'First name should be minimum 2 characters' })
            .max(155, { message: 'First name is too long' }),
        lastName: z
            .string({ message: 'Last name is required' })
            .min(2, { message: 'Last name should be minimum 2 characters' })
            .max(155, { message: 'Last name is too long' }),
        email: z.email({ message: 'Please provide valid email' }).max(156, { message: 'Email is too long' }),
        password: z
            .string({ message: 'Password is required' })
            .min(8, { message: 'Password must be at least 8 characters' })
            .max(18, { message: 'Password is too long' }),
        confirm: z.string({ message: 'Password confirmation is required' }),
    })
    .refine(({ password, confirm }) => password === confirm, {
        message: 'Confirm password does not match with password',
        path: ['confirm'],
    });
