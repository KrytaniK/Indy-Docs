"use client"

import styles from "./markdown.module.css";
import dynamic from "next/dynamic";
import { TableOfContents, VersionLink } from "..";
import { MDXComponents } from "mdx/types";

export default function Markdown({ sourceFile }: { sourceFile: string }) {
    const MDXContent = dynamic<MDXComponents>(() => import("/src/" + sourceFile).then((mod) => {
        return mod.default;
    }).catch(() => {
        const nullComp = () => <p style={{width: "100%", textAlign: "center"}}>Hmm... There&apos;s nothing here...</p>
        nullComp.displayName = "NullContentComponent";
        
        return nullComp;
    }), {
        loading: () => <p>Loading Content...</p>,
    });

    const MDXHeadings = dynamic<JSX.Element>(() => import("/src/" + sourceFile).then((mod) => {
        const defaultComponent = () => {
            return <>{!mod.meta || !mod.meta.headings ? null : <TableOfContents content={{headings: mod.meta.headings}}/>}</>
        };  
        defaultComponent.displayName = "DefaultHeadingsComponent";

        return defaultComponent;
    }).catch(() => {
        return () => null;
    }), {
        loading: () => <p>Loading Content...</p>,
    });

    MDXContent.displayName = "MDXContent";
    MDXHeadings.displayName = "MDXHeadings";

    return <section className={styles.markdownContainer}>
        {MDXHeadings && <MDXHeadings props={{}} key={"Headings"} type={""}/>}
        <div className={styles.content}>
            {MDXContent && <MDXContent
                components={{
                    h2(props: any) {
                        return <h2 id={props.children}>{props.children}</h2>
                    },
                    a(props: any) {
                        return <VersionLink href={props.href}>{props.children}</VersionLink>;
                    }
                }}
            />}
        </div>
    </section>
}