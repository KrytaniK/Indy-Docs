import metadata from "@/docs/meta.json";
    
export type DocPageEntry = {
    title: string,
    desc: string,
    href: string,
    pages: any,
}

export type DocPageMatch = {
    page: DocPageEntry,
    children: DocPageMatch[]
}

export type DocPageMatchFunction = (page: DocPageEntry) => boolean;

function ConvertDocPagesToArray(pages?: any): DocPageEntry[] {
    const _pages: DocPageEntry[] = [];
    
    // Object to Array base conversion, mapped as DocPageEntry
    const entries: DocPageEntry[] = Object.entries(pages).map((entry) => entry[1] as DocPageEntry);

    for (let i = 0; i < entries.length; i++) {
        _pages.push({
            ...entries[i],
            pages: ConvertDocPagesToArray(entries[i].pages)
        });
    }

    return _pages;
}

export const DocsArray = ConvertDocPagesToArray(metadata.pages);

export function QueryDocs(predicate: DocPageMatchFunction, pages?: DocPageEntry[]): DocPageMatch[] {
    const matches: DocPageMatch[] = [];

    const entries: DocPageEntry[] = pages ? pages : DocsArray;

    if (entries.length === 0) return [];

    for (let i = 0; i < entries.length; i++) {
        const page = entries[i];

        // Does this page match?
        if (predicate(page)) {
            matches.push({page, children: QueryDocs(predicate, page.pages)});
        } else {
            // If not, do any child pages match?
            const childMatches: DocPageMatch[] = QueryDocs(predicate, page.pages);
            if (childMatches.length > 0) {
                matches.push({page, children: childMatches});
            }
        }
    }

        return matches;

    return matches;
}