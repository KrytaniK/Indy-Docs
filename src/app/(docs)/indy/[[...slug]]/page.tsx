import React from "react"
import Markdown from "@/components/markdown/markdown";
import { PageHeader } from "@/components";

export default function IndyDocPage({ params }: { params: { slug: [string, string] } })
{
    const version = params.slug[0].replaceAll("-", ".");
    const page = params.slug[1];

    const mdxSource = `docs/indy/v${version}/${page}.mdx`;

    return <main>
         <PageHeader
            version={version}
            title="Indy"
            shortDesc={"Your one-stop shop for working with and learning about the Indy Game Engine"}
            page={page}
        />
        <Markdown sourceFile={mdxSource} />
    </main>
}