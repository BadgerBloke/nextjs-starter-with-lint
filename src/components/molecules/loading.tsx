import { Loading01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import Typography, { type TypographyVariant } from '../atoms/typography';

interface LoaderProps {
    message?: string;
    size?: number;
    messageClass?: string;
    variant?: TypographyVariant;
}

const Loader: React.FC<LoaderProps> = ({ message = 'Loading...', size = 20, messageClass, variant = 'small' }) => (
    <div className="m-auto flex h-full w-full flex-col items-center justify-center">
        <HugeiconsIcon icon={Loading01Icon} strokeWidth={2} size={size} className="animate-spin" />
        {message ? (
            <Typography variant={variant} className={messageClass}>
                {message}
            </Typography>
        ) : null}
    </div>
);

export default Loader;
