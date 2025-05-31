'use client';

import Typography from '~/components/atoms/typography';

import { useAuthErrorCode, useClearAuthError } from '../_components/store';

const AuthErrorPage = () => {
    const authErrorCode = useAuthErrorCode();
    const clearAuthError = useClearAuthError();

    switch (authErrorCode) {
        case 'DIRECT_ACCOUNT_VERIFICATIOIN': {
            clearAuthError();
            return <Typography variant="small">Direct account verification is not possible.</Typography>;
        }
    }
    return <div>Auth Error Page</div>;
};

export default AuthErrorPage;
