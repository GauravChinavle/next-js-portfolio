export default async function fetchStates() {
    try {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        const urlState = 'https://cdn-api.co-vin.in/api/v2/admin/location/states';
        const response = await fetch(urlState, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET"
        });
        const resJSON = await response.json();
        const states = resJSON.states;
        return states || [];
    } catch {

    }
}