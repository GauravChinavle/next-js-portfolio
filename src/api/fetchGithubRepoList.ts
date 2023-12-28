import { GITHUB_TOKEN  } from "@/utils";

export default async function fetchGithubRepo() {
    const headers = {
        'content-type': 'application/json',
        'Authorization': `Bearer ${GITHUB_TOKEN}`
    }  
    const requestBody = {
        query: `query GetPublicRepositoriesByOwner {
            user(login: "GauravChinavle") {
              repositories(first: 100, privacy: PUBLIC, orderBy: { field: CREATED_AT, direction: DESC }) {
                nodes {
                  name
                  url
                  updatedAt
                }
              }
            }
          }
          `
        }
    const res = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers,
            body: JSON.stringify(requestBody)
          }
    )
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    const { data } = await res.json();
    return data.user.repositories.nodes;
}