import React from "react";
import styles from "./homepage.module.css";

export default function Home(): React.ReactElement {
    return <main>
        {/* Make this a component (Reused on each page) */}
        <section className={styles.heading}>
            <h1>Indy - Documentation</h1>
            <div className={styles.pageInfo}>
                {/* Page Description */}
                <span>Your one-stop shop for working with and learning about the Indy Game Engine</span>
                {/* Page name */}
                <span></span>
            </div>
        </section>
        {/* ^ Make this a component (Reused on each page) ^ */}
        <section className={styles.sectionWrapper}>
            <h2>Featured</h2>
            <section className={styles.featured}>
                <div className={styles.featuredCard}>

                </div>
                <div className={styles.featuredCard}>

                </div>
                <div className={styles.featuredCard}>

                </div>
            </section>
        </section>
        <section className={styles.sectionWrapper}>
            <h2>Popular Pages</h2>
            <section className={styles.popular}>
                <div className={styles.popularCard}>

                </div>
                <div className={styles.popularCard}>

                </div>
                <div className={styles.popularCard}>

                </div>
                <div className={styles.popularCard}>

                </div>
                <div className={styles.popularCard}>

                </div>
                <div className={styles.popularCard}>

                </div>
                <div className={styles.popularCard}>

                </div>
                <div className={styles.popularCard}>

                </div>
            </section>
        </section>
    </main>;
}