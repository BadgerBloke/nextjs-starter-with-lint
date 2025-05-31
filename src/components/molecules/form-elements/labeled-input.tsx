import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

import { FieldMetadata } from '@conform-to/react';

import { cn } from '~/lib/utils';

interface FormInputProps<T extends string> extends InputHTMLAttributes<HTMLInputElement> {
    field: FieldMetadata<string, Record<T[number], string>, string[]>;
    label: string;
    description?: string;
    containerClassName?: string;
}

const LabeledInput = <T extends string>({ field, label, description, className, ...props }: FormInputProps<T>) => {
    return (
        <div
            className={cn(
                'relative w-full rounded-lg border border-input text-foreground bg-background shadow-sm shadow-black/5 transition-shadow focus-within:border-ring focus-within:outline-none focus-within:ring-[3px] focus-within:ring-ring/20 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 [&:has(input:is(:disabled))_*]:pointer-events-none',
                clsx({
                    'border-destructive/80 text-destructive focus-within:border-destructive/80 focus-within:ring-destructive/20':
                        field.errors,
                })
            )}
        >
            <label htmlFor={field.id} className="block px-3 pt-2 text-xs font-medium">
                {label}
            </label>
            <input
                name={field.name}
                key={field.key}
                className={cn(
                    'flex h-10 w-full bg-transparent px-3 pb-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none invalid:border-destructive/80 invalid:text-destructive invalid:focus-visible:border-destructive/80 invalid:focus-visible:ring-destructive/20',
                    className
                )}
                id={field.id}
                defaultValue={field.initialValue}
                aria-describedby={field.descriptionId}
                aria-invalid={field.errors ? 'true' : 'false'}
                {...props}
            />
            {description ? <span className="text-xl">{description}</span> : null}
            {field.errors && <span className="text-xs text-destructive px-3 pb-2 block">{field.errors}</span>}
        </div>
    );
};

export default LabeledInput;
