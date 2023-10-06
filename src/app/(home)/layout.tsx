import Nav from './nav';
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main className="relative h-screen overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
                <div className="flex items-start justify-between">
                    <Nav />
                    <div className="flex w-full flex-col pl-0 md:space-y-4 md:p-4">
                        <section>{children}</section>
                    </div>
                </div>
            </main>
        </>
    );
}
