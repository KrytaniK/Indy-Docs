"use client"

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Dropdown } from "..";
import docsMetadata from "@/docs/meta.json";
import styles from "./versionSelect.module.css";

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

        document.addEventListener("docs-version-request", HandleVersionRequest as EventListener);

        return () => {
            document.removeEventListener("docs-version-request", HandleVersionRequest as EventListener);
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

    return <Dropdown options={docsMetadata.versions} classNames={{wrapper: styles.versionSelect, list: styles.versionOptions, option: styles.versionOption}} onValueChange={(value) => SetTargetVersion(value)}>
        <button className={styles.versionSelectBtn}>{defaultVersion}</button>
    </Dropdown>
}