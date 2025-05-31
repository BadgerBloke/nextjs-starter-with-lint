import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { Check, Eye, EyeOff, X } from 'lucide-react';

import type { FieldMetadata } from '@conform-to/react';

import { cn } from '~/lib/utils';

interface PasswordInputProps<T extends string> extends React.ComponentProps<'input'> {
    field: FieldMetadata<string, Record<T[number], string>, string[]>;
    label: string;
}

const PasswordInput = <T extends string>({ field, label, className }: PasswordInputProps<T>) => {
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleVisibility = () => setIsVisible(prevState => !prevState);

    const checkStrength = (pass: string) => {
        const requirements = [
            { regex: /.{8,}/, text: 'At least 8 characters' },
            { regex: /[0-9]/, text: 'At least 1 number' },
            { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
            { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
        ];

        return requirements.map(req => ({
            met: req.regex.test(pass),
            text: req.text,
        }));
    };

    const strength = checkStrength(password);

    const strengthScore = useMemo(() => {
        return strength.filter(req => req.met).length;
    }, [strength]);

    const getStrengthColor = (score: number) => {
        if (score === 0) return 'bg-border';
        if (score <= 1) return 'bg-red-500';
        if (score <= 2) return 'bg-orange-500';
        if (score === 3) return 'bg-amber-500';
        return 'bg-emerald-500';
    };

    const getStrengthText = (score: number) => {
        if (score === 0) return 'Enter a password';
        if (score <= 2) return 'Weak password';
        if (score === 3) return 'Medium password';
        return 'Strong password';
    };

    return (
        <div>
            {/* Password input field with toggle visibility button */}
            <div
                className={cn(
                    'relative rounded-lg border border-input text-foreground bg-background shadow-sm shadow-black/5 transition-shadow focus-within:border-ring focus-within:outline-none focus-within:ring-[3px] focus-within:ring-ring/20 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 [&:has(input:is(:disabled))_*]:pointer-events-none',
                    clsx({
                        'border-destructive/80 text-destructive focus-within:border-destructive/80 focus-within:ring-destructive/20':
                            field.errors,
                    })
                )}
            >
                <label htmlFor={field.id} className="block px-3 pt-2 text-xs font-medium">
                    {label}
                </label>
                <div className="relative">
                    <input
                        name={field.name}
                        key={field.key}
                        className={cn(
                            'flex h-10 w-full bg-transparent pl-3 pe-9 pb-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none invalid:border-destructive/80 invalid:text-destructive invalid:focus-visible:border-destructive/80 invalid:focus-visible:ring-destructive/20',
                            className
                        )}
                        id={field.id}
                        defaultValue={field.initialValue}
                        aria-describedby={field.descriptionId}
                        type={isVisible ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        aria-invalid={strengthScore < 4}
                    />
                    <button
                        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label={isVisible ? 'Hide password' : 'Show password'}
                        aria-pressed={isVisible}
                        aria-controls="password"
                    >
                        {isVisible ? (
                            <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                        ) : (
                            <Eye size={16} strokeWidth={2} aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>

            {/* Password strength indicator */}
            <div
                className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
                role="progressbar"
                aria-valuenow={strengthScore}
                aria-valuemin={0}
                aria-valuemax={4}
                aria-label="Password strength"
            >
                <div
                    className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
                    style={{ width: `${(strengthScore / 4) * 100}%` }}
                ></div>
            </div>

            {/* Password strength description */}
            <p id="password-strength" className="mb-2 text-sm font-medium text-foreground">
                {getStrengthText(strengthScore)}. Must contain:
            </p>

            {/* Password requirements list */}
            <ul className="space-y-1.5" aria-label="Password requirements">
                {strength.map((req, index) => (
                    <li key={index} className="flex items-center gap-2">
                        {req.met ? (
                            <Check size={16} className="text-emerald-500" aria-hidden="true" />
                        ) : (
                            <X size={16} className="text-muted-foreground/80" aria-hidden="true" />
                        )}
                        <span className={`text-xs ${req.met ? 'text-emerald-600' : 'text-muted-foreground'}`}>
                            {req.text}
                            <span className="sr-only">{req.met ? ' - Requirement met' : ' - Requirement not met'}</span>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PasswordInput;
