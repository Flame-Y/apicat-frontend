export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="container mx-auto flex h-screen flex-1 items-center justify-center">
                <section>{children}</section>
            </div>
        </>
    );
}
