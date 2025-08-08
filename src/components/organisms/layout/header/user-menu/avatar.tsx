import { Session } from 'next-auth';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';

interface UserAvatarProps {
    user?: Session['user'];
    notificationsCount?: number;
}

export default function UserAvatar({ user, notificationsCount }: UserAvatarProps) {
    return (
        <Button variant="ghost" className="relative h-auto p-0 hover:bg-transparent">
            <Avatar>
                <AvatarImage
                    src={user?.image || '/images/icons/avatar-dark.png'}
                    alt={user?.name || 'Your profile picture'}
                />
                <AvatarFallback>KK</AvatarFallback>
            </Avatar>
            {notificationsCount ? (
                <Badge className="border-background absolute -top-1.5 left-full min-w-5 -translate-x-3.5 px-1">
                    {notificationsCount}
                </Badge>
            ) : null}
        </Button>
    );
}
