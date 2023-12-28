"use client";
import "./page.css";
import React from "react";
import ListingProjects from "./listingProjects";

export default function Projects() {  
  return (
    <div>
    <section id="projects">
      <div className="list-container">
          <ListingProjects/>
      </div>
    </section>
    </div>
  );
}
