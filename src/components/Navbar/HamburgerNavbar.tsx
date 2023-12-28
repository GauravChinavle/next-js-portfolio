"use client";

const toggleMenu = () => {
  const menu: any = document.querySelector(".menu-links");
  const icon: any = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

export default function HamburgerNavbar() {
  return (
    <nav id="hamburger-nav">
      <div className="logo">
        <a href="/">
                GC.
        </a>
      </div>
      <div className="hamburger-menu">
        <div className="hamburger-icon" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="menu-links">
          <li>
            <a href="/experience" onClick={toggleMenu}>
              Experience
            </a>
          </li>
          <li>
            <a href="/live-demos" onClick={toggleMenu}>
              Live Demos
            </a>
          </li>
          <li>
            <a href="/github-projects" onClick={toggleMenu}>
              Github Projects
            </a>
          </li>
          <li>
            <a href="/contact" onClick={toggleMenu}>
              Contact
            </a>
          </li>
        </div>
      </div>
    </nav>
  );
}
