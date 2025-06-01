import { z } from 'zod/v4';

export const schema = z.object({
    code: z.string({ message: 'Verification code is required' }).length(6, { message: 'Please provide a valid code' }),
});
