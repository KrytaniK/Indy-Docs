"use client"

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type VersionLinkProps = Readonly<{ href: string, versionIndex?: number, newTab?: boolean, className?: string, children: any }>;


export default function VersionLink(
    { href, versionIndex = -1, newTab = false, className, children }: VersionLinkProps
):
    React.ReactNode
{
    const { push } = useRouter();

    function Navigate(event: any) {
        if (versionIndex < 0) return;

        // Prevent navigating to the default link if the doc version is specified
        // ** This is to ensure the user-selected docs version is loaded.
        event.preventDefault();

        // Doc Version Request Event
        const customEvent = new CustomEvent("docs-version-request", {
            detail: {
                callback: (version: string) => {
                    // Format Version String (Retrieved as 'v[Major].[Minor].[Patch]')
                    const formattedVersion = version.replace("v", "").replaceAll(".", "-");
                    
                    // Replace version in href to the new formatted version
                    const splitLink = href.split("/");
                    splitLink[versionIndex + 1] = formattedVersion;

                    // Rejoin the split link
                    const formattedLink = splitLink.join("/");

                    // Utilize Default Link Behavior with Next Router to ensure persistant state
                    push(formattedLink);
                }
            }
        });

        document.dispatchEvent(customEvent);
    }

    return <Link className={className} target={newTab ? "_blank" : "_self"} id={href} href={href} onClick={Navigate}>{children}</Link>;
}