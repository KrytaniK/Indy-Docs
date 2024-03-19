"use client"

import styles from "./markdown.module.css";
import dynamic from "next/dynamic";
import { TableOfContents } from "..";

export default function Markdown({ sourceFile }: { sourceFile: string }) {
    const MDXContent = dynamic(() => import("/src/" + sourceFile).then((mod) => {
        return mod.default;
    }).catch(() => {
        return () => <p style={{width: "100%", textAlign: "center"}}>Hmm... There&apos;s nothing here...</p>;
    }), {
        loading: () => <p>Loading Content...</p>,
    });

    const MDXHeadings = dynamic(() => import("/src/" + sourceFile).then((mod) => {
        return () => (!mod.meta || !mod.meta.headings ? null : <TableOfContents content={{headings: mod.meta.headings}}/>);
    }).catch(() => {
        return () => null;
    }), {
        loading: () => <p>Loading Content...</p>,
    });

    MDXContent.displayName = "MDXContent";
    MDXHeadings.displayName = "MDXContent";

    return <section className={styles.markdownContainer}>
        {MDXHeadings && <MDXHeadings />}
        <div className={styles.content}>
            {MDXContent && <MDXContent
                styles={styles}
                components={{
                    h2(props: any) {
                        return <h2 id={props.children}>{props.children}</h2>
                    }
                }}
            />}
        </div>
    </section>
}