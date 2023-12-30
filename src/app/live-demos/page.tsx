"use client";
import Image from 'next/image'
import Portfolio from "@/portfolio";

export  default function Projects () {
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
                          width={300}
                          height={300}
                          alt="Project 2"
                          className="project-img"
                        />
                      </div>
                      <h2 className="experience-sub-title project-title">{demo}</h2>
                      <div className="btn-container">
                        <button
                          className="btn btn-color-2 project-btn"
                          onClick={() => window.open(demoValues.githubLink, "_blank")}
                          >
                          Github
                        </button>
                        <button
                          className="btn btn-color-2 project-btn"
                          onClick={() => window.open(demoValues.url, "_blank")}
                        >
                          Live Demo
                        </button>
                      </div>
                    </div>
                ))
            }
          </div>
        </div>
      </section>
    )
}