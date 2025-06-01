import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type AuthErrorCode = 'DIRECT_ACCOUNT_VERIFICATIOIN';

interface AuthState {
    isVerifyingNewAccount?: boolean;
    errorCode?: AuthErrorCode;
}

interface AuthAction {
    setIsVerifyingNewAccount: (state?: boolean) => void;
    setAuthErrorCode: (errorCode: AuthErrorCode) => void;
    clearAuthErrro: () => void;
}

interface AuthStore extends AuthState, AuthAction {}

const useAuthStore = create<AuthStore>()(
    immer(set => ({
        isVerifyingNewAccount: false,
        setIsVerifyingNewAccount: state => {
            if (typeof state === 'undefined') {
                set(prevState => {
                    prevState.isVerifyingNewAccount = !prevState.isVerifyingNewAccount;
                });
            } else {
                set({ isVerifyingNewAccount: state });
            }
        },
        setAuthErrorCode: errorCode => {
            set(state => {
                state['errorCode'] = errorCode;
            });
        },
        clearAuthErrro: () => {
            set(state => {
                state.errorCode = undefined;
            });
        },
    }))
);

export const useIsVerifyingNewAccount = () => useAuthStore(state => state.isVerifyingNewAccount);
export const useSetIsVerifyingNewAccount = () => useAuthStore(state => state.setIsVerifyingNewAccount);
export const useAuthErrorCode = () => useAuthStore(state => state.errorCode);
export const useSetAuthErrorCode = () => useAuthStore(state => state.setAuthErrorCode);
export const useClearAuthError = () => useAuthStore(state => state.clearAuthErrro);
