import React from "react"
import styles from "../../../homepage.module.css" // temp
import Markdown from "@/components/markdown";

export default function IndyDocPage({ params }: { params: { slug: [string, string] } })
{
    const version = params.slug[0].replaceAll("-", ".");
    const page = params.slug[1];

    const mdxSource = `docs/indy/v${version}/${page}.mdx`;

    return <main>
        <section className={styles.heading}>
            <span style={{opacity: "50%"}}>v{version}</span>
            <h1>Indy</h1>
            <div className={styles.pageInfo}>
                {/* Page Description */}
                <span>Your one-stop shop for working with and learning about the Indy Game Engine</span>
                {/* Page name */}
                <span>{page}</span>
            </div>
        </section>
        <Markdown sourceFile={mdxSource} />
    </main>
}