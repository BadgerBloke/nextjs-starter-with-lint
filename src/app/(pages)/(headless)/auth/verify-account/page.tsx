'use client';

import { useId } from 'react';
import { useRouter } from 'next/navigation';
import { OTPInput, SlotProps } from 'input-otp';
import { MinusIcon } from 'lucide-react';

import { Label } from '~/components/ui/label';
import { cn } from '~/lib/utils';

import { useIsVerifyingNewAccount } from '../_components/store';

const VerificationPage = () => {
    const id = useId();
    const isVerifyingNewAccount = useIsVerifyingNewAccount();
    const router = useRouter();

    if (!isVerifyingNewAccount) {
        return router.replace('/auth/error');
    }

    return (
        <div className="*:not-first:mt-2">
            <Label htmlFor={id}>OTP input double</Label>
            <OTPInput
                id={id}
                containerClassName="flex items-center gap-3 has-disabled:opacity-50"
                maxLength={6}
                render={({ slots }) => (
                    <>
                        <div className="flex">
                            {slots.slice(0, 3).map((slot, idx) => (
                                <Slot key={idx} {...slot} />
                            ))}
                        </div>

                        <div className="text-muted-foreground/80">
                            <MinusIcon size={16} aria-hidden="true" />
                        </div>

                        <div className="flex">
                            {slots.slice(3).map((slot, idx) => (
                                <Slot key={idx} {...slot} />
                            ))}
                        </div>
                    </>
                )}
            />
            <p className="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
                Built with{' '}
                <a
                    className="hover:text-foreground underline"
                    href="https://github.com/guilhermerodz/input-otp"
                    target="_blank"
                    rel="noopener nofollow noreferrer"
                >
                    Input OTP
                </a>
            </p>
        </div>
    );
};

function Slot(props: SlotProps) {
    return (
        <div
            className={cn(
                'border-input bg-background text-foreground relative -ms-px flex size-9 items-center justify-center border font-medium shadow-xs transition-[color,box-shadow] first:ms-0 first:rounded-s-md last:rounded-e-md',
                { 'border-ring ring-ring/50 z-10 ring-[3px]': props.isActive }
            )}
        >
            {props.char !== null && <div>{props.char}</div>}
        </div>
    );
}

export default VerificationPage;
