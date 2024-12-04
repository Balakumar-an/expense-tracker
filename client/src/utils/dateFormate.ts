import moment from "moment";

export const dateFormat = (date: Date): string => {
  return moment(date).format("DD/MM/YYYY");
};
