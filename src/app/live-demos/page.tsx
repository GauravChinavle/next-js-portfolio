"use client";
import Image from 'next/image'
import Portfolio from "@/portfolio";
import { githubLogo, openLinkLogo } from '@/public/assets';

export default function Projects() {
  const { liveDemos } = Portfolio;
  return (
    <section id="projects">
      <div className="experience-details-container">
        <div className="about-containers">
          {
            liveDemos && Object.entries(liveDemos).map(([demo, demoValues]: [string, any]) => (
              <div className="details-container color-container" key={demo}>
                <div className="article-container">
                  <Image
                    src={demoValues.imagePath}
                    width={400}
                    height={200}
                    alt={demo}
                    className="project-img"
                  />
                </div>
                <h4 className="experience-sub-title project-title">{demo}</h4>
                <div className="btn-container">
                  <Image
                    src={githubLogo}
                    alt="Github Link"
                    className="icon"
                    height={30}
                    width={30}
                    onClick={() => location.href = demoValues.githubLink}
                  />
                  <Image
                    src={openLinkLogo}
                    alt="Live Demo"
                    className="icon"
                    height={30}
                    width={30}
                    onClick={() => window.open(demoValues.url, "_blank")}
                  />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}