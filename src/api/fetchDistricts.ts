export default async function fetchDistricts(state: string) {
    try {
        const urlDist = `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state}`;
        const response = await fetch(urlDist, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET"
        });
        const resJSON = await response.json();
        const districts = resJSON.districts;
        return districts || [];
    } catch (e) {
        console.log(e);
    }
}