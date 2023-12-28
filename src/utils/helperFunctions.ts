import { moment } from "./requireHelper";

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

export const getYears = (startDate: string) => {
  const years = moment().diff(moment(startDate, "DD MMM YYYY"), "years", true).toFixed(1);
  return years;
};