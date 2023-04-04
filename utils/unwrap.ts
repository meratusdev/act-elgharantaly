import { type DocumentElement } from "@keystatic/core";

interface UnwrapContent {
  (data: DocumentElement[] | undefined, title: string): string;
}

export const unwrapContent: UnwrapContent = (data, title) => {
  if (!data) {
    return "";
  }

  const fullText =
    title +
    data
      .map((item) => {
        return item.children.map((child) => child.text).join("");
      })
      .join(" ");

  return fullText;
};
