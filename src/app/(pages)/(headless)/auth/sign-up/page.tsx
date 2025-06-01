import Image from 'next/image';

import { Card, CardContent } from '~/components/ui/card';
import { cn } from '~/lib/utils';

import SignUpForm from './_components/form';

const SignUpPage = async () => (
    <div className={cn('flex flex-col gap-6')}>
        <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
                <SignUpForm />
                <div className="bg-muted relative hidden md:block">
                    <Image
                        src="/images/placeholder.svg"
                        alt="Auth page"
                        fill
                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking Sign up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
    </div>
);

export default SignUpPage;
