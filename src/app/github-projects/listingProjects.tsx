import "./page.css";
import Image from 'next/image'
import { fetchGithubRepo } from "@/api";
import { githubLogo } from '@/public/assets';
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
        githubProjects?.map(({ name, updatedAt, url }) => (
          <div className="list-item" key={name}>
            <span>{name}</span>
            <span>{moment(updatedAt).format("DD MMM YYYY HH:mm:ss")}</span>
            <Image
              src={githubLogo}
              width={20}
              height={20}
              alt={name}
              onClick={() => window.open(url, '_blank')}
            />
          </div>
        ))
      }
    </>
  );
}