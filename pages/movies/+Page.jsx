import { useSuspenseQuery } from "@tanstack/react-query"

export default Page

function Page() {
    const { data } = useSuspenseQuery({
        queryKey: ["movies"],
        queryFn: () => fetch('https://star-wars.brillout.com/api/films.json')
            .then(res => res.json())
    });

    return (
        <>
            <h1>Movies</h1>
            <ul>
                {data.results.map(({ title }) => (
                    <li>{title}</li>
                ))}
            </ul>
        </>
    )
}
