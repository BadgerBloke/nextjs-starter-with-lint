const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <h1>Auth</h1>
            {children}
        </div>
    );
};

export default AuthLayout;
