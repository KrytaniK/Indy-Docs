import { VersionSelect, VersionLink, SearchBar, Sidebar } from "../components";
import { DocPageEntry } from "@/utils/docUtils";
import DocData from "@/docs/meta.json";

import "@/globals.css";

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
          <SearchBar />
          {DocData.nav.links.map((link: DocPageEntry) => {
            return <VersionLink key={link.href} href={link.href}>{link.title}</VersionLink>
          })}
        </div>
        <Sidebar/>
        {children}
      </body>
    </html>
  );
}