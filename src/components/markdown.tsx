"use client"

import React, { lazy, Suspense } from "react";

export default function Markdown({ sourceFile }: { sourceFile: string }): React.ReactElement {
    
    const MDX = lazy(() => import("/src/" + sourceFile));

    return <Suspense fallback={<div>Loading Content...</div>}>
        <MDX/>
    </Suspense>
}