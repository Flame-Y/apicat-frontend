/* Injects */
import SideDirectory from '@/app/components/sideDirectory';

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex items-start justify-between">
                <SideDirectory />
                <div className="flex w-full flex-col pl-0 md:space-y-4 md:p-4">
                    <section>{children}</section>
                </div>
            </div>
        </>
    );
}
