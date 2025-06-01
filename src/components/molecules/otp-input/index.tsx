import { useId } from 'react';
import { OTPInput, OTPInputProps } from 'input-otp';
import { MinusIcon } from 'lucide-react';

import { Label } from '~/components/ui/label';

import Slot from './slot';

type OtpInputProps = Partial<Omit<OTPInputProps, 'children'>> & {
    label: string;
};

const OtpInput = ({ label, ...props }: OtpInputProps) => {
    const id = useId();
    return (
        <div className="*:not-first:mt-3">
            <Label htmlFor={id}>{label}</Label>
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
                {...props}
            />
        </div>
    );
};

export default OtpInput;
