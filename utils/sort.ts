import { sortBy } from "lodash";

interface SortByDate {
  <T extends { publishedDate: string }>(data: T[], option: "asc" | "desc"): T[];
}

export const sortByDate: SortByDate = (data, option) => {
  const result = sortBy(data, (item) => {
    return new Date(item.publishedDate).getTime();
  });

  if (option === "desc") {
    return result.reverse();
  }

  return result;
};
