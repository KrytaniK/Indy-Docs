"use client"

import { useState, useEffect } from "react";
import { ScrollTo } from "..";
import styles from "./tableOfContents.module.css";

type TOCProps = {
    content: {
        headings: string[],
    }
}

export default function TableOfContents({ content }: TOCProps) {
    const [activeSectionIndex, SetActiveSectionIndex] = useState<number>(-1);
    
    useEffect(() => {
        const self = document.getElementById(styles.postTOC);
        if (!self) return;

        const scrollContainer = self?.parentElement?.parentElement;

        if (!scrollContainer) {
            console.warn("Scroll Container Null");
            return;
        }

        const scrollContainerRect = scrollContainer.getBoundingClientRect();
        const upperBound = scrollContainerRect.top + 96;
        const lowerBound = scrollContainerRect.bottom - 384;

        function OnScroll(event: Event) {
            let headerFound = false;

            
            if (self) {
                if (self.getBoundingClientRect().top === 128) {
                    console.log("Equal");
                    self.classList.add(styles.sticking);
                } else {
                    self.classList.remove(styles.sticking);
                }
            }

            for (let i = 0; i < content.headings.length; i++) {
                const el = document.getElementById(content.headings[i]);

                if (!el) {
                    console.warn(`Heading ${content.headings[i]} Not Found.`);
                    continue;
                }

                const rect = el.getBoundingClientRect();
                
                // Check for headings within the bounds, only select the first header found
                if (rect.bottom > upperBound && rect.top < lowerBound) {
                    if (activeSectionIndex == i) {
                        headerFound = true;
                        break;
                    }
                    else {
                        headerFound = true;
                        SetActiveSectionIndex(i);

                        document.getElementById(`tocIndex-${i}`)?.classList.add(styles.activeHeading);

                        if (activeSectionIndex >= 0) {
                            document.getElementById(`tocIndex-${activeSectionIndex}`)?.classList.remove(styles.activeHeading);
                        }

                        break;
                    }
                }
            }

            const currentEl = document.getElementById(`${content.headings[activeSectionIndex]}`);
            if (!currentEl) return;
            
            const rect = currentEl?.getBoundingClientRect();
            if (!headerFound && rect.top > lowerBound) {

                document.getElementById(`tocIndex-${activeSectionIndex - 1}`)?.classList.add(styles.activeHeading);

                if (activeSectionIndex >= 0) {
                    document.getElementById(`tocIndex-${activeSectionIndex}`)?.classList.remove(styles.activeHeading);
                }

                SetActiveSectionIndex((prev) => prev - 1);
            }
        }

        scrollContainer.addEventListener("scroll", OnScroll);
        
        return () => {
            scrollContainer.removeEventListener("scroll", OnScroll);
        }
    })

    return <nav id={styles.postTOC}>
        <div className={styles.onThisPage}><strong>On This Page</strong></div>
        <div className={styles.scrollLinks}>
            {content?.headings?.map((heading: string, index: number) => (
                <ScrollTo
                    key={heading}
                    index={index}
                    elementID={heading}
                >
                    {heading}
                </ScrollTo>
            ))}
        </div>
    </nav>
}