'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useSignUp } from '@clerk/nextjs';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod/v4';

import LabeledInput from '~/components/molecules/form-elements/labeled-input';
import LabeledPasswordInput from '~/components/molecules/form-elements/labeled-passwrod-input';
import PasswordInput from '~/components/molecules/form-elements/password-input-with-strength';
import { SubmitButton } from '~/components/molecules/form-elements/submit-button';
import SocialLoginButtons from '~/components/organisms/social-login-buttons';
import { dispatchToast } from '~/lib/utils/message-handler';

import { useSetIsVerifyingNewAccount } from '../../_components/store';

import { schema } from './schema';

const SignUpForm = () => {
    const { signUp, isLoaded } = useSignUp();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const setVerifyingNewAccount = useSetIsVerifyingNewAccount();

    const [form, fields] = useForm({
        // lastResult,
        shouldValidate: 'onSubmit',
        shouldRevalidate: 'onInput',
        onValidate: ({ formData }) => parseWithZod(formData, { schema }),
        onSubmit: async (e, { formData }) => {
            e.preventDefault();
            const result = parseWithZod(formData, { schema });
            try {
                setIsSubmitting(true);

                if (isLoaded && result.status === 'success') {
                    const { email, password, firstName, lastName } = result.value;
                    const res = await signUp.create({
                        emailAddress: email,
                        password,
                        firstName,
                        lastName,
                        legalAccepted: true,
                    });
                    if (res.status === 'missing_requirements' && !res.missingFields.length) {
                        setVerifyingNewAccount(true);
                        const res = await signUp.prepareEmailAddressVerification({
                            strategy: 'email_code',
                        });
                        if (res.status === 'missing_requirements' && !res.missingFields.length) {
                            router.replace('/auth/verify-account');
                        }
                    } else {
                        dispatchToast({
                            type: 'error',
                            message: {
                                title: 'Sign up failed!',
                                description: 'Something went wrong while creating account',
                            },
                        });
                    }
                }
            } catch (error) {
                setVerifyingNewAccount(false);
                dispatchToast({
                    type: 'error',
                    message: { title: 'Sign up failed!', description: (error as Error).message },
                });
            } finally {
                setIsSubmitting(false);
            }
        },
    });
    return (
        <form className="p-6 md:p-8" id={form.id} onSubmit={form.onSubmit} method="POST">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome to app</h1>
                    <p className="text-muted-foreground text-balance">Create an Acme Inc account</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <LabeledInput field={fields.firstName} label="First name" placeholder="Rohit" />
                    <LabeledInput field={fields.lastName} label="Email" placeholder="Sharma" />
                </div>
                <LabeledInput field={fields.email} label="Email" placeholder="email@example.com" />
                <PasswordInput field={fields.password} label="Password" />
                <LabeledPasswordInput field={fields.confirm} label="Confirm password" />
                <SubmitButton submitting={isSubmitting} disabled={!isLoaded || isSubmitting}>
                    Sign up
                </SubmitButton>

                {/* CAPTCHA Widget */}
                <div id="clerk-captcha" />

                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-card text-muted-foreground relative z-10 px-2">Or continue with</span>
                </div>
                <SocialLoginButtons />
                <div className="text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <Link href="/auth/sign-in" className="underline underline-offset-4">
                        Sign in
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default SignUpForm;
