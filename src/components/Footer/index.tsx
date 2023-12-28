import Portfolio from "@/portfolio";

export default function Footer() {
    const { name } = Portfolio;
    return (
        <footer>
            <nav>
                <div className="nav-links-container">
                    <ul className="nav-links">
                        <li><a href="#about">About</a></li>
                        <li><a href="#experience">Experience</a></li>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
            </nav>
            <p>{`Copyright © 2024 ${name}. All Rights Reserved.`}</p>
        </footer>
    )
}