import React from "react";
import styles from "./intro.module.css";

export default function IntroPage(): React.ReactNode {
    return <main>
        <div className={styles.notFound}>
            <h4>Uh oh... Something isn&apos;t right</h4>
            <p>(404) Page not found</p>
        </div>
    </main>;
}