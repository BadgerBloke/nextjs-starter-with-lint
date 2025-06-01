'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useSignUp } from '@clerk/nextjs';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod/v4';

import { SubmitButton } from '~/components/molecules/form-elements/submit-button';
import OtpInput from '~/components/molecules/otp-input';
import { Card, CardContent } from '~/components/ui/card';
import { dispatchToast } from '~/lib/utils/message-handler';

import AuthError from '../_components/auth-error';
import { useIsVerifyingNewAccount, useSetIsVerifyingNewAccount } from '../_components/store';

import { schema } from './_components/schema';

const VerificationPage = () => {
    const { signUp, setActive, isLoaded } = useSignUp();
    const isVerifyingNewAccount = useIsVerifyingNewAccount();
    const setVerifyingNewAccount = useSetIsVerifyingNewAccount();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form] = useForm({
        onValidate: ({ formData }) => parseWithZod(formData, { schema }),
        onSubmit: async (e, { formData }) => {
            e.preventDefault();
            try {
                if (!isLoaded) {
                    dispatchToast({
                        type: 'warning',
                        message: { title: 'Context lost!', description: 'It seems like signup context has been lost' },
                    });
                    return;
                }

                setIsSubmitting(true);
                const result = parseWithZod(formData, { schema });
                if (result.status === 'success') {
                    const { code } = result.value;
                    const res = await signUp.attemptEmailAddressVerification({
                        code,
                    });

                    if (res.status === 'complete') {
                        await setActive({ session: res.createdSessionId });
                        setVerifyingNewAccount(false);
                        return router.replace('/dashboard');
                    }
                }
            } catch (error) {
                dispatchToast({
                    type: 'error',
                    message: { title: 'Verification failed!', description: (error as Error).message },
                });
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    if (!isVerifyingNewAccount) return <AuthError code="DIRECT_ACCOUNT_VERIFICATIOIN" />;

    return (
        <Card className="sm:max-w-md mx-auto">
            <CardContent>
                <form id={form.id} onSubmit={form.onSubmit} className="grid gap-3">
                    <OtpInput label="Account verification code" name="code" />

                    {/* CAPTCHA Widget */}
                    <div id="clerk-captcha" />

                    <SubmitButton className="w-fit mt-4" submitting={isSubmitting}>
                        Submit
                    </SubmitButton>
                </form>
            </CardContent>
        </Card>
    );
};

export default VerificationPage;
