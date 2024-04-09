"use client"

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { VersionLink, Dropdown } from "..";
import { DocPageMatch, QueryDocs } from "@/utils/docUtils";
import styles from "./sidebar.module.css";

function RenderDocLinks(links: DocPageMatch[], currentPath: string): React.ReactNode {
    const splitPath = currentPath.split("/");
    const versionRegex = /\d+-\d+-\d+/;
   
    return links.map((link) => {
        // Figure out whether this page is the current page
        // ** This is for styling purposes
        let isCurrentPage: boolean = false;
        const splitHref = link.page.href.split("/");

        if (splitPath.length === splitHref.length) {
            isCurrentPage = true;

            for (let i = 0; i < splitPath.length; i++) {
                // Where the pathname differs, we must check
                // for the regex pattern, since it might be the doc version.
                // The docs metadata holds hrefs with version 0-0-0, so any case
                // where this pattern is matched must be ignored. (e.g., 0-0-0 vs 1-0-0 should be ignored)
                if (splitPath[i] !== splitHref[i]) {
                    if (versionRegex.test(splitPath[i]))
                        continue;
                    else {
                        isCurrentPage = false;
                        break;
                    }
                }
            }
        }

        return <li
            key={link.page.title}
            id={`sidebar${link.page.href}`}
            className={styles.docLink}
        >
            <VersionLink href={link.page.href} className={!isCurrentPage ? styles.title : `${styles.title} ${styles.selected}`}>{link.page.title}</VersionLink>
            {link.page.pages.length > 0 ?
                <ul>
                    {RenderDocLinks(link.children, currentPath)}
                </ul>
                : null
            }
        </li>
    });
}

export default function Sidebar(): React.ReactNode {

    const [filteredPages, SetFilteredPages] = useState<DocPageMatch[]>(QueryDocs(() => true));
    const pathname = usePathname();

    useEffect(() => {
        const links = document.getElementsByClassName(styles.docLinks)[0];
        const active = links.querySelectorAll(`.${styles.active}`);
        
        // Some links will remain 'active' when they aren't suppose to be.
        for (let i = 0; i < active.length; i++) {
            active[i].classList.remove(styles.active);
        }

        // Recurse through each parent docLink element and apply an active class.
        const selected = links.getElementsByClassName(styles.selected)[0];
        
        let parent = selected?.parentElement;
        if (parent === null || parent === undefined)
            return;
        
        while (!parent?.classList.contains(styles.docLinks)) {
            if (parent === null || parent === undefined)
                break;

            if (parent?.classList.contains(styles.docLink))
                parent?.classList.add(styles.active);

            // parent.classList.remove(styles.selected);
            parent = parent.parentElement;
        }

    }, [pathname]);

    function FilterPages(event: any) {
        const query: string = event.currentTarget.value;

        const matches: DocPageMatch[] = QueryDocs(
            (page) => (
                page.title.toLowerCase().includes(query.toLowerCase()) ||
                page.desc.toLowerCase().includes(query.toLowerCase())
            )
        );

        SetFilteredPages(matches);
    }

    function ResetPageFilter() {
        // Clear filter input
        document.getElementsByClassName(styles.sidebar)[0].getElementsByTagName("input")[0].value = "";

        // Reset filtered pages state
        SetFilteredPages(QueryDocs(() => true));
    }

    return <div className={styles.sidebar}>
        <Dropdown classNames={{wrapper: styles.filterByDropdown}}>
            <input className={styles.filterInput} placeholder="Filter Pages.." onChange={FilterPages}></input>
        </Dropdown>
        <ul className={styles.docLinks} onClick={ResetPageFilter}>
            {RenderDocLinks(filteredPages, pathname)}
        </ul>
        <ul className={styles.resources}>
            <li><h5>Resources</h5></li>
            <li><VersionLink newTab={true} href="https://www.github.com/krytanik/indy">{/* Github SVG */} Github Repository {/* Arrow Diag SVG */}</VersionLink></li>
            <li><VersionLink newTab={true} href="https://www.youtube.com/@krytanik">{/* Github SVG */} YouTube Tutorials {/* Arrow Diag SVG */}</VersionLink></li>
        </ul>
        <VersionLink href="/tutorials/indy/beginner/your-first-app" className={styles.cta}>
            <div>
                <h5>Don&apos;t Know Where To Start?</h5>
                <p>Learn to build your first application with our beginner tutorial</p>
                <div className={styles.ctaImg}>{ /* Replace this div with custom Image component */}</div>
            </div>
        </VersionLink>
    </div>;
} 