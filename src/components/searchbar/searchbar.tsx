"use client"

import React, { useRef, useState } from "react";
import { Dropdown, VersionLink } from "..";
import { DocPageMatch, QueryDocs } from "@/utils/docUtils";
import styles from "./searchbar.module.css";

type SearchBarState = {
    query: string,
    matches: DocPageMatch[],
}

export default function SearchBar(): React.ReactNode {
    const [searchState, SetSearchState] = useState<SearchBarState>({
        query: "",
        matches: []
    });

    const bgRef: any = useRef();

    function Query(event: React.ChangeEvent<HTMLInputElement>) {
        const query = event.currentTarget.value;

        const matches = QueryDocs(
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
                onChange={Query}
            ></input>
        </Dropdown>

    </>;
}