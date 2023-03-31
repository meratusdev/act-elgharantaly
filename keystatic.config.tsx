import {
  collection,
  config,
  fields,
  type GitHubConfig,
  type LocalConfig,
} from "@keystatic/core";

import { ComponentBlocks } from "~/components/Keystatic/ComponentBlocks";

const storage: LocalConfig["storage"] | GitHubConfig["storage"] =
  process.env.NODE_ENV === "development"
    ? { kind: "local" }
    : {
        kind: "github",
        repo: {
          owner: "meratusdev",
          name: "act-elgharantaly",
        },
      };

export default config({
  storage,
  collections: {
    posts: collection({
      label: "Posts",
      path: "content/posts/*/",
      slugField: "title",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
          },
        }),
        summary: fields.text({
          label: "Summary",
          multiline: true,
          validation: {
            length: {
              min: 1,
            },
          },
        }),
        publishedDate: fields.date({
          label: "Published Date",
          validation: {
            isRequired: true,
          },
        }),
        coverImage: fields.image({
          label: "Image",
          directory: "public/images/posts",
        }),
        instagramLink: fields.url({
          label: "Instagram Link",
        }),
        tags: fields.array(
          fields.relationship({
            label: "Tag",
            collection: "tags",
          }),
          {
            label: "Tags",
            itemLabel: (props) => props.value || "Please select a tag",
          },
        ),
        content: fields.document({
          formatting: true,
          dividers: true,
          links: true,
          layouts: [
            [1, 1],
            [1, 1, 1],
            [2, 1],
            [1, 2, 1],
          ],
          label: "Content",
          componentBlocks: ComponentBlocks,
        }),
      },
    }),
    tags: collection({
      label: "Tags",
      path: "content/tags/*",
      slugField: "name",
      schema: {
        name: fields.slug({
          name: {
            label: "Name",
            validation: {
              length: {
                min: 1,
              },
            },
          },
        }),
      },
    }),
  },
});
