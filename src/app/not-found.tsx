import React from "react";
import styles from "./404.module.css";

export default function default404(): React.ReactNode {
    return <main>
        <div className={styles.notFound}>
            <h4>Uh oh... Something isn&apos;t right</h4>
            <p>(404) Page not found</p>
        </div>
    </main>;
}