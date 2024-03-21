import { VersionSelect, VersionLink, SearchBar } from "../components";
import DocData from "@/docs/meta.json";

import "@/globals.css";

type DocPageEntry = {
  title: string,
  shortDesc: string,
  href: string,
  pages: any
}

function GenerateSidebarLinks(pageList: Object, listClass?: string): React.ReactNode {
  const pages = Object.entries(pageList);
  if (pages.length === 0) return null;

  return <ul className={listClass}>
    {pages.map((entry) => {
      const page: DocPageEntry = entry[1];
      
      return <li key={entry[0]}>
        <VersionLink href={page.href}>{page.title}</VersionLink>
        {GenerateSidebarLinks(page.pages)}
      </li>
    })}
  </ul>
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet"/ >
      </head>
      <body>
        <div className="navPanel">
          <VersionLink href="/">Indy Docs</VersionLink>
          <VersionSelect/>
          <SearchBar docsMetadata={DocData} />
          {DocData.nav.links.map((link) => {
            return <VersionLink key={link.href} href={link.href}>{link.title}</VersionLink>
          })}
        </div>
        <div className="sidePanel">
          <input placeholder="Filter Pages" />
          
          {GenerateSidebarLinks(DocData.pages, "docLinks")}

          <ul className="resources">
            <h4>Resources</h4>
            <li><VersionLink newTab={true} href="https://www.github.com/krytanik/indy">{/* Github SVG */} Github Repository {/* Arrow Diag SVG */}</VersionLink></li>
            <li><VersionLink newTab={true} href="https://www.youtube.com/@krytanik">{/* Github SVG */} YouTube Tutorials {/* Arrow Diag SVG */}</VersionLink></li>
          </ul>
          <VersionLink href="/tutorials/indy/beginner/your-first-app" className="cta">
            <div>
               <h5>Don&apos;t Know Where To Start?</h5>
              <p>Learn to build your first application with our beginner tutorial</p>
              <div>{ /* Make this an image */}</div>
            </div>
          </VersionLink>
        </div>
        {children}
      </body>
    </html>
  );
}