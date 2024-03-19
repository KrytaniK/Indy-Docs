import styles from "./pageHeader.module.css";

export default function PageHeader({ version = "", title = "New Page", shortDesc = "This is a new page", page = "" }:
    { version: string, title: string, shortDesc: string, page: string })
{
    return <section className={styles.heading}>
        <span style={{opacity: "50%"}}>v{version}</span>
        <h1>{title}</h1>
        <div className={styles.pageInfo}>
            <span>{shortDesc}</span>
            <span>{page}</span>
        </div>
    </section>
}