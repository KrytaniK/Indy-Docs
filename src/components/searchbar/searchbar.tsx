"use client"

import React, { useRef, useState } from "react";
import { Dropdown, VersionLink } from "..";
import styles from "./searchbar.module.css";

type DocPageEntry = {
    title: string,
    desc: string,
    href: string,
    pages: any,
}

type DocPageMatch = {
    page: DocPageEntry,
    children: DocPageMatch[]
}

type SearchBarProps = {
    docsMetadata: any // Should be an imported JSON Document
}

type SearchBarState = {
    query: string,
    matches: DocPageMatch[],
}

type DocPageMatchFunction = (page: DocPageEntry) => boolean;

export default function SearchBar({ docsMetadata }: SearchBarProps): React.ReactNode {
    const [searchState, SetSearchState] = useState<SearchBarState>({
        query: "",
        matches: []
    });

    const bgRef: any = useRef();

    function MatchDocQuery(pages: Object, match: DocPageMatchFunction): DocPageMatch[] {
        const matches: DocPageMatch[] = [];
        const entries = Object.entries(pages)
            .map((entry: [string, unknown]) => entry[1] as DocPageEntry);

        if (entries.length === 0) return [];

        for (let i = 0; i < entries.length; i++) {
            const page = entries[i];

            if (match(page)) {
                matches.push({page, children: MatchDocQuery(page.pages, match)});
            }
        }

        return matches;
    }

    function QueryDocs(event: React.ChangeEvent<HTMLInputElement>) {
        const query = event.currentTarget.value;
        
        const matches = MatchDocQuery(docsMetadata.pages,
            (page) => (
                page.title.toLowerCase().includes(query.toLowerCase()) ||
                page.desc.toLowerCase().includes(query.toLowerCase())
            )
        );

        SetSearchState((prev) => ({ ...prev, query, matches }));
    }

    function RenderSearchResults(matches: DocPageMatch[]): React.ReactNode | React.ReactElement | React.ReactElement[] {
        if (matches.length === 0) return null;

        return matches.map((match) => {
            return <li
                className={styles.searchResult}
                key={match.page.href}
                onClick={() => SetSearchState((prev) => ({ ...prev, open: false }))}
            >
                <VersionLink href={match.page.href} className={styles.title} key={match.page.href}>{match.page.title}</VersionLink>
                <p className={styles.desc}>{match.page.desc}</p>
                {<ul>
                    {RenderSearchResults(match.children)}
                </ul>}
            </li>
        })
    }

    return <>
        <div className={styles.backgroundBlur} ref={bgRef} />
        <Dropdown
            classNames={{ wrapper: styles.searchContainer }}
            options={RenderSearchResults(searchState.matches)}
            onOpen={() => bgRef.current ? bgRef.current.classList.add(styles.active) : null}
            onClose={() => bgRef.current ? bgRef.current.classList.remove(styles.active) : null}
        >
            <input
                value={searchState.query}
                className={styles.userInput}
                placeholder="Search All Documentation"
                onChange={QueryDocs}
            ></input>
        </Dropdown>

    </>;

    //     <section className={styles.searchContainer}>
    //         <input
    //             value={searchState.query}
    //             className={`${styles.userInput} ${searchState.open ? styles.active : ""}`}
    //             placeholder="Search All Documentation"
    //             onFocus={() => searchState.open ? null : ToggleFocus()}
    //             onBlur={(e) => e.relatedTarget ? ToggleFocus() : null}
    //             onChange={QueryDocs}
    //         ></input>
    //         <ul className={`${styles.searchResults} ${searchState.open ? styles.active : ""}`}>
    //             {RenderSearchResults(searchState.matches)}
    //         </ul>
    //     </section>
    // </>;
}