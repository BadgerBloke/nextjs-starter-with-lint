import Header from '~/components/organisms/layout/header';

const PagesLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="relative flex flex-col flex-1">
        <div className="flex flex-col flex-1 gap-4 w-full px-4 sm:px-10 max-w-[1344px] mx-auto">
            <Header />
            {children}
        </div>
    </div>
);

export default PagesLayout;
