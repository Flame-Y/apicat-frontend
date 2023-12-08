export default function Page({ params }: { params: { [projectId: string]: string } }) {
    return (
        <div>
            My Post:
            {Object.keys(params).map((key, value) => {
                return (
                    <div key={key}>
                        {key}:{params[key]}
                    </div>
                );
            })}
        </div>
    );
}
