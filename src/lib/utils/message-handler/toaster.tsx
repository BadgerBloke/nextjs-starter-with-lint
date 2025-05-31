'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { dispatchToast } from '../message-handler';

const MessageToaster = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            const message = searchParams.get('message');
            if (message) {
                try {
                    const response = JSON.parse(message);
                    dispatchToast(response);

                    // Create a new URLSearchParams object without the 'message' parameter
                    const newSearchParams = new URLSearchParams(searchParams.toString());
                    newSearchParams.delete('message');

                    // Construct the new URL
                    const newPathname = newSearchParams.toString() ? `${pathname}?${newSearchParams.toString()}` : pathname;

                    // Replace the current URL without the 'message' parameter
                    router.replace(newPathname, { scroll: false });
                } catch (error) {
                    console.error('Error parsing message:', error);
                }
            }
        }
    }, [searchParams, pathname, router]);

    return null;
};

export const ReRenderingMessageToaster = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const message = searchParams.get('message');
        if (message) {
            try {
                const response = JSON.parse(message);
                dispatchToast(response);

                // Create a new URLSearchParams object without the 'message' parameter
                const newSearchParams = new URLSearchParams(searchParams.toString());
                newSearchParams.delete('message');

                // Construct the new URL
                const newPathname = newSearchParams.toString() ? `${pathname}?${newSearchParams.toString()}` : pathname;

                // Replace the current URL without the 'message' parameter
                router.replace(newPathname, { scroll: false });
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        }
    }, [searchParams, pathname, router]);

    return null;
};

export default MessageToaster;
