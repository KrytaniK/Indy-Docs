import { VersionSelect, VersionLink } from "../components";

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
          <input placeholder="Search All Documentation"/>
          <VersionLink href="/roadmap">Roadmap</VersionLink>
          <VersionLink href="/reference">Reference</VersionLink>
          <VersionLink href="/blog">Blog</VersionLink>
        </div>
        <div className="sidePanel">
          <input placeholder="Filter Pages" />
          <ul className="docLinks">
            <li><VersionLink href="/intro">Introduction</VersionLink></li>
            <li><VersionLink href="/tutorials">Tutorials</VersionLink></li>
            <li><VersionLink href="/news">What&apos;s New {/* Arrow SVG */}</VersionLink></li>
            <li>
              <VersionLink href="/reactor/1-0-0/overview" versionIndex={1}>The Reactor [Core] {/* Arrow SVG */}</VersionLink>
              <ul>
                <li><VersionLink href="/reactor/1-0-0/overview" versionIndex={1}>Overview</VersionLink></li>
                <li><VersionLink href="/reactor/1-0-0/quick-start-guide" versionIndex={1}>Quick Start Guide</VersionLink></li>
              </ul>
            </li>
            <li>
              <VersionLink href="/indy/1-0-0/overview" versionIndex={1}>Indy [Editor] {/* Arrow SVG */}</VersionLink>
              <ul>
                <li><VersionLink href="/indy/1-0-0/overview" versionIndex={1}>Overview</VersionLink></li>
                <li><VersionLink href="/indy/1-0-0/quick-start-guide" versionIndex={1}>Quick Start Guide</VersionLink></li>
              </ul>
            </li>
          </ul>
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