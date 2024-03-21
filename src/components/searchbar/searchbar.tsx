"use client"

import React, { useState } from "react";
import styles from "./searchbar.module.css";

type SearchBarProps = {
    docsMetadata: any // Object imported from JSON
}

type SearchBarState = {
    open: boolean,
    query: string,
    titles: string[],
}

function ExtractTitles(docPages: Object): string[] {
    const titles: string[] = [];

    

    return titles;
}

export default function SearchBar({ docsMetadata }: SearchBarProps): React.ReactNode {
    const [searchState, SetSearchState] = useState<SearchBarState>({
        open: false,
        query: "",
        titles: docsMetadata.hasOwnProperty("docs") ? docsMetadata.docs : []
    });

    function ToggleFocus() {
        SetSearchState((prev) => ({ ...prev, open: !prev.open }));
    }

    return <>
        <div className={`${styles.backgroundBlur} ${searchState.open ? styles.active : ""}`} onClick={ToggleFocus}/>
        <section className={styles.searchContainer}>
            <input className={`${styles.userInput} ${searchState.open ? styles.active : ""}`} placeholder="Search All Documentation" onFocus={() => searchState.open ? null : ToggleFocus()} onBlur={(e) => e.relatedTarget ? ToggleFocus() : null}></input>
            <div onFocus={ToggleFocus} className={`${styles.searchResults} ${searchState.open ? styles.active : ""}`}>
                
            </div>
        </section>
    </>;
}