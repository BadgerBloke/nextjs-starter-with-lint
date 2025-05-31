'use client';

import { useState } from 'react';
import Link from 'next/link';

import { useSignIn } from '@clerk/nextjs';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod/v4';

import LabeledInput from '~/components/molecules/form-elements/labeled-input';
import LabeledPasswordInput from '~/components/molecules/form-elements/labeled-passwrod-input';
import {
    SubmitButton,
    SubmitIcon,
    SubmitIdealText,
    SubmittingText,
} from '~/components/molecules/form-elements/submit-button';
import SocialLoginButtons from '~/components/organisms/social-login-buttons';
import { dispatchToast } from '~/lib/utils/message-handler';

import { schema } from './schema';

const SignInForm = () => {
    const { signIn, setActive, isLoaded } = useSignIn();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, fields] = useForm({
        shouldValidate: 'onSubmit',
        shouldRevalidate: 'onInput',
        onValidate: ({ formData }) => {
            return parseWithZod(formData, { schema });
        },

        onSubmit: async (e, { formData }) => {
            e.preventDefault();

            const result = parseWithZod(formData, { schema });
            if (isLoaded && result.status === 'success') {
                try {
                    setIsSubmitting(true);
                    const res = await signIn.create({ identifier: result.value.email, password: result.value.password });
                    if (res?.status === 'complete') {
                        await setActive({ session: res.createdSessionId });
                    } else {
                        dispatchToast({
                            type: 'error',
                            message: { title: 'Authentication failed!', description: 'Something went wrong while sign in' },
                        });
                    }
                } catch (error) {
                    dispatchToast({
                        type: 'error',
                        message: { title: 'Authentication failed!', description: (error as Error).message },
                    });
                } finally {
                    setIsSubmitting(false);
                }
            }
            return result.reply();
        },
    });

    return (
        <form className="p-6 md:p-8" onSubmit={form.onSubmit} id={form.id}>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-muted-foreground text-balance">Login to your Acme Inc account</p>
                </div>
                <LabeledInput
                    field={fields.email}
                    type="email"
                    label="Email"
                    placeholder="email@example.com"
                    disabled={isSubmitting}
                />
                <LabeledPasswordInput field={fields.password} label="Password" disabled={isSubmitting} />
                <SubmitButton
                    type="submit"
                    className="w-full gap-2"
                    submitting={isSubmitting}
                    disabled={!isLoaded || isSubmitting}
                >
                    <SubmitIcon />
                    <SubmitIdealText>Sign in</SubmitIdealText>
                    <SubmittingText>Please wait...</SubmittingText>
                </SubmitButton>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-card text-muted-foreground relative z-10 px-2">Or continue with</span>
                </div>
                <SocialLoginButtons processing={!isLoaded || isSubmitting} />
                <div className="text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <Link href="/auth/sign-up" className="underline underline-offset-4">
                        Sign up
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default SignInForm;
