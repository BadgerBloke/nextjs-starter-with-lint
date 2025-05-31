import { useState } from 'react';
import clsx from 'clsx';
import { Eye, EyeOff } from 'lucide-react';

import type { FieldMetadata } from '@conform-to/react';

import { cn } from '~/lib/utils';

interface PasswordInputProps<T extends string> extends React.ComponentProps<'input'> {
    field: FieldMetadata<string, Record<T[number], string>, string[]>;
    label: string;
    description?: string;
}

const LabeledPasswordInput = <T extends string>({
    field,
    label,
    className,
    description,
    ...props
}: PasswordInputProps<T>) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleVisibility = () => setIsVisible(prevState => !prevState);
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
                        placeholder="********"
                        {...props}
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
                {description ? <span className="text-xl">{description}</span> : null}
                {field.errors && <span className="text-xs text-destructive px-3 pb-2 block">{field.errors}</span>}
            </div>
        </div>
    );
};

export default LabeledPasswordInput;
