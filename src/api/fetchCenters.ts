export default async function fetchCenters(district: string, date: string) {
    try {
        const urlCenter = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district}&date=${date}`;
        const response = await fetch(urlCenter, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "GET",
        mode: "cors"
        });
        const resJSON = await response.json();
        const centers = resJSON.centers;
        return centers;
    } catch (e) {
        console.log(e);
    }
}