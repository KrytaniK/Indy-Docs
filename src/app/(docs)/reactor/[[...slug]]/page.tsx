import React from "react"
import {PageHeader, Markdown} from "@/components";

export default function IndyDocPage({ params }: { params: { slug: [string, string] } })
{
    const version = params.slug[0].replaceAll("-", ".");
    const page = params.slug[1];

    const mdxSource = `docs/reactor/v${version}/${page}.mdx`;

    return <main>
        <PageHeader
            version={version}
            title="The Reactor"
            shortDesc={"The powerhouse of Indy"}
            page={page}
        />
        <Markdown sourceFile={mdxSource} />
    </main>
}