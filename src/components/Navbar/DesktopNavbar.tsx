import Portfolio from "@/portfolio";

export default function DesktopNavbar() {
    const { logoHeader } = Portfolio;
    return (
        <nav id="desktop-nav">
            <div className="logo">
                <a href="/">
                    {logoHeader}
                </a>
            </div>
            <div>
                <ul className="nav-links">
                    <li>
                        <a href="/experience">Experience</a>
                    </li>
                    <li>
                        <a href="/live-demos">Live Demos</a>
                    </li>
                    <li>
                        <a href="/github-projects">Github Projects</a>
                    </li>
                    <li>
                        <a href="/contact">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
