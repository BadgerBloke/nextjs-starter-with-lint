'use client';

import { createContext, ReactNode, useContext } from 'react';
import { Loader2, LogIn, LucideIcon } from 'lucide-react';

import { Button, ButtonProps } from '~/components/ui/button';
import { cn } from '~/lib/utils';

// Context for sharing state between compound components
interface SubmitButtonContextValue {
    submitting: boolean;
    noIcon?: boolean;
}

const SubmitButtonContext = createContext<SubmitButtonContextValue | null>(null);

const useSubmitButtonContext = (component: string) => {
    const context = useContext(SubmitButtonContext);
    if (!context) {
        throw new Error(`Submit.${component} compound components must be used within Submit.Button`);
    }
    return context;
};

// Root component
interface SubmitButtonRootProps extends ButtonProps {
    submitting?: boolean;
    noIcon?: boolean;
    children: ReactNode;
}

const SubmitButton = ({ submitting = false, noIcon, className, children, ...props }: SubmitButtonRootProps) => {
    return (
        <SubmitButtonContext.Provider value={{ submitting, noIcon }}>
            <Button type="submit" className={cn('w-full', className)} {...props}>
                {children}
            </Button>
        </SubmitButtonContext.Provider>
    );
};

// Ideal Text component
interface SubmitButtonIdealTextProps {
    children: ReactNode;
    className?: string;
}

const SubmitIdealText = ({ children, className }: SubmitButtonIdealTextProps) => {
    const { submitting } = useSubmitButtonContext('IdealText');

    if (submitting) return null;

    return <span className={className}>{children}</span>;
};

// Submitting Text component
interface SubmitButtonSubmittingTextProps {
    children: ReactNode;
    className?: string;
}

const SubmittingText = ({ children, className }: SubmitButtonSubmittingTextProps) => {
    const { submitting } = useSubmitButtonContext('SubmittingText');

    if (!submitting) return null;

    return <span className={className}>{children}</span>;
};

// Icon component
interface SubmitButtonIconProps {
    icon?: LucideIcon;
    className?: string;
    children?: ReactNode;
}

const SubmitIcon = ({ icon: Icon = LogIn, className, children }: SubmitButtonIconProps) => {
    const { submitting, noIcon } = useSubmitButtonContext('Icon');

    if (noIcon) return null;

    if (submitting) {
        return <Loader2 className={cn('animate-spin h-4 w-4', className)} />;
    }

    return children ?? <Icon className={cn('h-4 w-4', className)} />;
};

// Compound component with dot notation
const Submit = {
    Button: SubmitButton,
    IdealText: SubmitIdealText,
    SubmittingText: SubmittingText,
    Icon: SubmitIcon,
};

export { SubmitButton, SubmitIcon, SubmitIdealText, SubmittingText };
export default Submit;
