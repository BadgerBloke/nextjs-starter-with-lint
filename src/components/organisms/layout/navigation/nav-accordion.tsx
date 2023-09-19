import Link from 'next/link';
import { v4 as uuid } from 'uuid';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { buttonVariants } from '~/components/ui/button';
import { NavbarMenuType } from '~/lib/constants/navbar-menus';
import { cn } from '~/lib/utils';

const NavAccordion = ({ item, onClick }: { item: NavbarMenuType; onClick: () => void }) => {
    return (
        <Accordion type="single" collapsible className="w-full xl:hidden">
            <AccordionItem value={item.href.slice(1)} className="space-y-2 border-none">
                <AccordionTrigger className={cn(buttonVariants({ variant: 'ghost' }), 'justify-between hover:no-underline')}>
                    {item.text}
                </AccordionTrigger>
                <AccordionContent>
                    <div className="ml-4 flex flex-col gap-1 rounded-md bg-muted/30">
                        {item.children?.map(e => (
                            <Link
                                key={uuid()}
                                href={e.href}
                                onClick={onClick}
                                className={cn(buttonVariants({ variant: 'ghost' }), 'justify-start')}
                            >
                                {e.text}
                            </Link>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default NavAccordion;
