import { CircleCheckBig, Info, ServerCrash, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';

import Typography from '~/components/atoms/typography';

export const GO_FOR = {
    GO_FOR_LOGIN: 'GO_FOR_LOGIN',
} as const;

type GoForType = (typeof GO_FOR)[keyof typeof GO_FOR];

type OtherMessageType =
    | string
    | GoForType
    | {
          title: string;
          description: string;
          closeButton?: boolean;
          duration?: number;
          dismissible?: boolean;
      };

type ValidationStatus = 'error' | 'success' | 'warning';
type DataType = Record<string, string | string[] | boolean | undefined>;
type ErrorAndWarningValidationType = {
    message: OtherMessageType;
    status: Extract<ValidationStatus, 'error' | 'warning'>;
    data: DataType;
};
type SuccessValidationType = {
    message: OtherMessageType;
    status: Extract<ValidationStatus, 'success'>;
    data?: DataType;
};

export type MessageResponse =
    | {
          type: 'success' | 'error' | 'info' | 'warning';
          message: OtherMessageType;
      }
    | ({ type: 'validation' } & ErrorAndWarningValidationType)
    | ({ type: 'validation' } & SuccessValidationType)
    | { type: 'redirect'; url: string };

export class Message {
    static readonly GO_FOR = GO_FOR;

    public static success(message: OtherMessageType): MessageResponse {
        return { type: 'success', message };
    }

    public static error(message: OtherMessageType): MessageResponse {
        return { type: 'error', message };
    }

    public static info(message: OtherMessageType): MessageResponse {
        return { type: 'info', message };
    }

    public static warning(message: OtherMessageType): MessageResponse {
        return { type: 'warning', message };
    }

    public static redirect(url: string): MessageResponse {
        return { type: 'redirect', url };
    }

    public static validation(args: ErrorAndWarningValidationType): MessageResponse;
    public static validation(args: SuccessValidationType): MessageResponse;
    public static validation(args: {
        message: OtherMessageType;
        status: ValidationStatus;
        data?: DataType;
    }): MessageResponse {
        const { status, message, data } = args;
        if (status === 'success') {
            return { type: 'validation', message, status, data };
        } else {
            return { type: 'validation', message, status, data: data! };
        }
    }
}

export const dispatchToast = (response: MessageResponse | null) => {
    if (!response) return null;
    const { type } = response;

    if (type !== 'redirect') {
        const { message } = response;
        if (typeof message === 'string') {
            switch (type) {
                case 'success':
                case 'error':
                case 'info':
                case 'warning':
                    toast[type](message, { position: 'top-right', duration: 5000 });
                    break;
                case 'validation':
                    toast[response.status](message, { position: 'top-right', duration: 5000 });
                    break;
            }
        } else {
            if (!message) return;
            const { title, description, closeButton, duration, dismissible } = message;
            const closable = duration === Infinity ? true : closeButton;
            const dismiss = duration === Infinity ? true : dismissible;

            switch (type) {
                case 'success':
                case 'error':
                case 'info':
                case 'warning':
                    toast[type](title, {
                        description,
                        duration,
                        closeButton: closable,
                        dismissible: dismiss,
                    });
                    break;
                case 'validation':
                    toast[response.status](title, {
                        description,
                        duration,
                        closeButton: closable,
                        dismissible: dismiss,
                    });
                    break;
            }
        }
    }
};

export const renderMessage = (response: MessageResponse) => {
    const { type } = response;

    if (type !== 'redirect') {
        const { message } = response;
        if (typeof message === 'string') {
            switch (type) {
                case 'success': {
                    return (
                        <div className="mb-4 flex flex-row items-start space-y-0 space-x-3 rounded-md border bg-emerald-100 px-3 py-2 text-emerald-500 shadow">
                            <CircleCheckBig className="h-4 w-4" />
                            <Typography variant="small">{message}</Typography>
                        </div>
                    );
                }
                case 'error': {
                    return (
                        <div className="mb-4 flex flex-row items-start space-y-0 space-x-3 rounded-md border bg-rose-100 px-3 py-2 text-rose-500 shadow">
                            <ServerCrash className="h-4 w-4" />
                            <Typography variant="small">{message}</Typography>
                        </div>
                    );
                }
                case 'info': {
                    return (
                        <div className="mb-4 flex flex-row items-start space-y-0 space-x-3 rounded-md border px-3 py-2 shadow">
                            <Info className="h-4 w-4" />
                            <Typography variant="small">{message}</Typography>
                        </div>
                    );
                }
                case 'warning': {
                    return (
                        <div className="mb-4 flex flex-row items-start space-y-0 space-x-3 rounded-md border bg-yellow-100 px-3 py-2 text-yellow-700 shadow">
                            <ShieldAlert className="h-4 w-4" />
                            <Typography variant="small">{message}</Typography>
                        </div>
                    );
                }
                case 'validation': {
                    switch (response.status) {
                        case 'success': {
                            return (
                                <div className="mb-4 flex flex-row items-start space-y-0 space-x-3 rounded-md border bg-emerald-100 px-3 py-2 text-emerald-500 shadow">
                                    <CircleCheckBig className="h-4 w-4" />
                                    <Typography variant="small">{message}</Typography>
                                </div>
                            );
                        }
                        case 'error': {
                            return (
                                <div className="mb-4 flex flex-row items-start space-y-0 space-x-3 rounded-md border bg-rose-100 px-3 py-2 text-rose-500 shadow">
                                    <ServerCrash className="h-4 w-4" /> <Typography variant="small">{message}</Typography>
                                </div>
                            );
                        }
                        case 'warning': {
                            return (
                                <div className="mb-4 flex flex-row items-start space-y-0 space-x-3 rounded-md border bg-yellow-100 px-3 py-2 text-yellow-700 shadow">
                                    <ShieldAlert className="h-4 w-4" /> <Typography variant="small">{message}</Typography>
                                </div>
                            );
                        }
                    }
                }
            }
        } else {
            const { title, description } = message;

            switch (type) {
                case 'success': {
                    return (
                        <div className="mb-4 flex flex-row items-start space-y-0 space-x-3 rounded-md border bg-emerald-100 px-3 py-2 text-emerald-500 shadow">
                            <CircleCheckBig className="h-4 w-4" />
                            <div className="grid space-y-1 leading-none">
                                <Typography variant="small">{title}</Typography>
                                <Typography variant="tiny" className="text-emerald-900">
                                    {description}
                                </Typography>
                            </div>
                        </div>
                    );
                }
                case 'error': {
                    return (
                        <div className="mb-4 flex flex-row items-start space-y-0 space-x-3 rounded-md border bg-rose-100 px-3 py-2 text-rose-500 shadow">
                            <ServerCrash className="h-4 w-4" />
                            <div className="grid space-y-1 leading-none">
                                <Typography variant="small">{title}</Typography>
                                <Typography variant="tiny" className="text-rose-900">
                                    {description}
                                </Typography>
                            </div>
                        </div>
                    );
                }
                case 'info': {
                    return (
                        <div className="mb-4 flex flex-row items-start space-y-0 space-x-3 rounded-md border px-3 py-2 shadow">
                            <Info className="h-4 w-4" />
                            <div className="grid space-y-1 leading-none">
                                <Typography variant="small">{title}</Typography>
                                <Typography variant="tiny">{description}</Typography>
                            </div>
                        </div>
                    );
                }
                case 'warning': {
                    return (
                        <div className="mb-4 flex flex-row items-start space-y-0 space-x-3 rounded-md border bg-yellow-100 px-3 py-2 text-yellow-500 shadow">
                            <ShieldAlert className="h-4 w-4" />
                            <div className="grid space-y-1 leading-none">
                                <Typography variant="small">{title}</Typography>
                                <Typography variant="tiny" className="text-yellow-900">
                                    {description}
                                </Typography>
                            </div>
                        </div>
                    );
                }
                case 'validation': {
                    switch (response.status) {
                        case 'success': {
                            return (
                                <div className="mb-4 flex flex-row items-start space-y-0 space-x-3 rounded-md border bg-emerald-100 px-3 py-2 text-emerald-500 shadow">
                                    <CircleCheckBig className="h-4 w-4" />
                                    <div className="grid space-y-1 leading-none">
                                        <Typography variant="small">{title}</Typography>
                                        <Typography variant="tiny" className="text-emerald-900">
                                            {description}
                                        </Typography>
                                    </div>
                                </div>
                            );
                        }
                        case 'error': {
                            return (
                                <div className="mb-4 flex flex-row items-start space-y-0 space-x-3 rounded-md border bg-rose-100 px-3 py-2 text-rose-500 shadow">
                                    <ServerCrash className="h-4 w-4" />
                                    <div className="grid space-y-1 leading-none">
                                        <Typography variant="small">{title}</Typography>
                                        <Typography variant="tiny" className="text-rose-900">
                                            {description}
                                        </Typography>
                                    </div>
                                </div>
                            );
                        }
                        case 'warning': {
                            return (
                                <div className="mb-4 flex flex-row items-start space-y-0 space-x-3 rounded-md border bg-yellow-100 px-3 py-2 text-yellow-500 shadow">
                                    <ShieldAlert className="h-4 w-4" />
                                    <div className="grid space-y-1 leading-none">
                                        <Typography variant="small">{title}</Typography>
                                        <Typography variant="tiny" className="text-yellow-900">
                                            {description}
                                        </Typography>
                                    </div>
                                </div>
                            );
                        }
                    }
                }
            }
        }
    }
};
