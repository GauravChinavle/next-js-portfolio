"use client";

import Portfolio from "@/portfolio";

export default function Experience () {
  const { experience } = Portfolio;
    return (
        <section id="experience">
        <div className="experience-details-container">
          <div className="about-containers">
            {
                experience && Object.entries(experience).map(([skill, skillValues]: [string, string[]]) => (
                    <div className="details-container" key={skill}>
                    <h2 className="experience-sub-title">{skill}</h2>
                    <div className="article-container">
                        {skillValues.map((s: string) => (
                             <article key={s}>
                             <div>
                               <h4>{s}</h4>
                             </div>
                           </article>
                        ))}
                    </div>
                  </div>
                ))
                
            }

          </div>
        </div>
      </section>
    )
}