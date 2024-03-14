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
          <h2>Indy Docs</h2>
          <button>v1.0.0 {/* Arrow SVG */}</button>
          <input placeholder="Search All Documentation"/>
          <a href="/roadmap">Roadmap</a>
          <a href="/reference">Reference</a>
          <a href="/blog">Blog</a>
        </div>
        <div className="sidePanel">
          <input placeholder="Filter Pages" />
          <ul className="docLinks">
            <li><a href="/intro">Introduction</a></li>
            <li><a href="/tutorials">Tutorials</a></li>
            <li><a href="/news">What&apos;s New {/* Arrow SVG */}</a></li>
            <li>
              <a href="/reactor/1-0-0/overview">The Reactor [Core] {/* Arrow SVG */}</a>
              <ul>
                <li><a href="/reactor/1-0-0/overview">Overview</a></li>
                <li><a href="/reactor/1-0-0/quick-start-guide">Quick Start Guide</a></li>
              </ul>
            </li>
            <li>
              <a href="/indy/1-0-0/overview">Indy [Editor] {/* Arrow SVG */}</a>
              <ul>
                <li><a href="/indy/1-0-0/overview">Overview</a></li>
                <li><a href="/indy/1-0-0/quick-start-guide">Quick Start Guide</a></li>
              </ul>
            </li>
          </ul>
          <ul className="resources">
            <h4>Resources</h4>
            <li><a target="_blank" href="https://www.github.com/krytanik/indy">{/* Github SVG */} Github Repository {/* Arrow Diag SVG */}</a></li>
            <li><a target="_blank" href="https://www.youtube.com/@krytanik">{/* Github SVG */} YouTube Tutorials {/* Arrow Diag SVG */}</a></li>
          </ul>
          <a href="/tutorials/indy/beginner/your-first-app" className="cta">
            <div>
               <h4>Don&apos;t Know Where To Start?</h4>
              <p>Learn to build your first application with our beginner tutorial</p>
              <div>{ /* Make this an image */}</div>
            </div>
          </a>
        </div>
        {children}
      </body>
    </html>
  );
}