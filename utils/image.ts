interface GetImageUrl {
  collection: "posts";
  slug: string;
  filename: string | null;
}

export const getImageUrl = ({ slug, filename, collection }: GetImageUrl) => {
  if (!filename) return null;
  const path = "images";
  return `/${path}/${collection}/${slug}/${filename}`;
};
