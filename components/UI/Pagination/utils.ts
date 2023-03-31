export const createPageNumbers = (page: number, total: number) => {
  const pages = [] as Array<number | null>;
  const limit = 5;

  if (total <= limit) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  }

  if (total > limit) {
    const start = page - 2;
    const end = page + 2;

    if (start > 1) {
      pages.push(1);
    }

    if (start > 2) {
      pages.push(null);
    }

    for (let i = start; i <= end; i++) {
      if (i > 0 && i <= total) {
        pages.push(i);
      }
    }

    if (end < total - 1) {
      pages.push(null);
    }

    if (end < total) {
      pages.push(total);
    }
  }

  return pages;
};
