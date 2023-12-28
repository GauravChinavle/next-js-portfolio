import "./page.css";
import { fetchGithubRepo } from "@/api";
import { moment } from "@/utils";

export default async function ListingProjects() {
    type GithubProject = {
      name: string;
      updatedAt: string;
      url: string;
    };
    const githubProjects: GithubProject[] = await fetchGithubRepo();
    return (
      <>
        {
          githubProjects?.map(({name, updatedAt, url}) => (
              <div className="list-item" key={name}>
              <span>{name}</span>
              <span>{moment(updatedAt).format("DD MMM YYYY HH:mm:ss")}</span>
              <button className="list-btn btn-color-1" onClick={() => window.open(url, '_blank')}>
                Github
              </button>
            </div>
            ))
        }
      </>
    );
  }