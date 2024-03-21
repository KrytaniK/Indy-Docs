"use client"

import React, { useState } from "react";
import styles from "./searchbar.module.css";
import { VersionLink } from "..";

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
    open: boolean,
    query: string,
    matches: DocPageMatch[],
}

type DocPageMatchFunction = (page: DocPageEntry) => boolean;

export default function SearchBar({ docsMetadata }: SearchBarProps): React.ReactNode {
    const [searchState, SetSearchState] = useState<SearchBarState>({
        open: false,
        query: "",
        matches: []
    });

    function ToggleFocus() {
        SetSearchState((prev) => ({ ...prev, open: !prev.open }));
    }

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

    function RenderSearchResults(matches: DocPageMatch[]): React.ReactNode {
        if (matches.length === 0) return null;

        return matches.map((match) => {
            return <div
                className={styles.searchResult}
                key={match.page.href}
                onClick={() => SetSearchState((prev) => ({ ...prev, open: false }))}
            >
                <VersionLink href={match.page.href} className={styles.title} key={match.page.href}>{match.page.title}</VersionLink>
                <p className={styles.desc}>{match.page.desc}</p>
                {RenderSearchResults(match.children)}
            </div>
        })
    }

    return <>
        <div className={`${styles.backgroundBlur} ${searchState.open ? styles.active : ""}`} onClick={ToggleFocus}/>
        <section className={styles.searchContainer}>
            <input
                value={searchState.query}
                className={`${styles.userInput} ${searchState.open ? styles.active : ""}`}
                placeholder="Search All Documentation"
                onFocus={() => searchState.open ? null : ToggleFocus()}
                onBlur={(e) => e.relatedTarget ? ToggleFocus() : null}
                onChange={QueryDocs}
            ></input>
            <div onFocus={ToggleFocus} className={`${styles.searchResults} ${searchState.open ? styles.active : ""}`}>
                <div>
                    {searchState.open && RenderSearchResults(searchState.matches)}
                </div>
            </div>
        </section>
    </>;
}