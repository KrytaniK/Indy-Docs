"use client"

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function VersionSelect():
    React.ReactNode
{
    const [defaultVersion, SetDefaultVersion] = useState<string>("");
    
    const { push } = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        
        function SetInitialState() {
            // is pattern "[digit]-[digit]-[digit]" in the url?
            const versionPatternMatch = pathname.match(/\d+-\d+-\d+/);

            // If not, choose the most recent docs version
            let version = "";
            if (!versionPatternMatch) {
                version = "v1.0.0"; // Replace with latest version

            } else { // otherwise, use matched pattern
                const versionSlug = versionPatternMatch.at(0);
                if (!versionSlug) return;

                version = "v".concat(versionSlug?.replaceAll("-", "."));
            }

            if (version === defaultVersion) return;

            SetDefaultVersion(version);
        }

        function HandleVersionRequest(event : CustomEvent) {
            const { callback } = event.detail;

            callback(defaultVersion);
        }

        if (defaultVersion.length === 0)
            SetInitialState();

        // This is generating red squigglies, despite being valid code. Idk why.
        document.addEventListener("docs-version-request", HandleVersionRequest);

        return () => {
            // This is generating red squigglies, despite being valid code. Idk why.
            document.removeEventListener("docs-version-request", HandleVersionRequest);
        }

    }, [defaultVersion]);

    function SetTargetVersion(version: string) {
        SetDefaultVersion(version);

        const newVersionSlug = version.replaceAll("v", "").replaceAll(".", "-");
        
        const path = window.location.href;
        const pathNotOrigin = path.slice(window.location.origin.length);
        const oldVersionSlug = pathNotOrigin.split("/")[2];

        if (!pathNotOrigin || !oldVersionSlug || pathNotOrigin?.length === 0 || oldVersionSlug?.length === 0)
            return;

        push(window.location.href.replace(oldVersionSlug, newVersionSlug));
    }
    
    return <select
        id="docsVersionSelect"
        value={defaultVersion}
        onChange={(e) => SetTargetVersion(e.currentTarget.value)}
    >
        <option value={"v1.0.0"}>v1.0.0</option>
        <option value={"v0.5.6"}>v0.5.6</option>
    </select>
}