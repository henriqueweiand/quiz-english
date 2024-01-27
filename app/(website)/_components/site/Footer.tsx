import Link from "next/link"

const navigation = {
    sources: [
        { name: 'Podcasts quiz', href: '/?sources=Podcast' },
        { name: 'Videos quiz', href: '/?sources=Video' },
        { name: 'Articles quiz', href: '/?sources=Article' },
        { name: 'News quiz', href: '/?sources=News' },
    ],
    levels: [
        { name: 'A1 quiz', href: '/?levels=A1' },
        { name: 'A2 quiz', href: '/?levels=A2' },
        { name: 'B1 quiz', href: '/?levels=B1' },
        { name: 'B2 quiz', href: '/?levels=B2' },
        { name: 'C1 quiz', href: '/?levels=C1' },
    ],
}

export function Footer() {
    return (
        <footer className="py-12" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="flex flex-col items-center md:flex-row md:items-start justify-center gap-10 flex-wrap">

                <div>
                    <h3 className="text-sm font-semibold leading-12">Subjects</h3>
                    <ul role="list" className="mt-6 space-y-4">
                        {navigation.sources.map((item) => (
                            <li key={item.name}>
                                <Link href={item.href} className="text-sm leading-6 text-muted-foreground">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-10 md:mt-0">
                    <h3 className="text-sm font-semibold leading-6 ">English levels</h3>
                    <ul role="list" className="mt-6 space-y-4">
                        {navigation.levels.map((item) => (
                            <li key={item.name}>
                                <Link href={item.href} className="text-sm leading-6 text-muted-foreground">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </footer>
    )
}
