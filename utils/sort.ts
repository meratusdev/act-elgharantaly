import { sortBy } from "lodash";

interface SortByDate {
  <T extends { publishedDate: string | null }>(
    data: T[],
    option: "asc" | "desc",
  ): T[];
}

export const sortByDate: SortByDate = (data, option) => {
  const result = sortBy(data, (item) => {
    if (!item.publishedDate) {
      throw new Error("publishedDate is required");
    }

    return new Date(item.publishedDate).getTime();
  });

  if (option === "desc") {
    return result.reverse();
  }

  return result;
};
