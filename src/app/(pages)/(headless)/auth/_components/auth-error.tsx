import Typography from '~/components/atoms/typography';

import { AuthErrorCode, useAuthErrorCode, useClearAuthError } from './store';

const AuthError = ({ code }: { code?: AuthErrorCode }) => {
    const authErrorCode = useAuthErrorCode();
    const clearAuthError = useClearAuthError();

    switch (authErrorCode || code) {
        case 'DIRECT_ACCOUNT_VERIFICATIOIN': {
            clearAuthError();
            return <Typography variant="small">Direct account verification is not possible.</Typography>;
        }
    }
    return <div>Auth Error Page</div>;
};

export default AuthError;
