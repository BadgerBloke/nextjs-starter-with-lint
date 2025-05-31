'use server';

import { SubmissionResult } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod/v4';

import { schema } from './schema';

export const action = async (prevState: SubmissionResult<string[]> | null, formData: FormData) => {
    await Promise.all([setTimeout(() => {}, 3000)]);
    const result = parseWithZod(formData, { schema });
    return result.reply();
};
