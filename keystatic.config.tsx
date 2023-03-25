import {
  collection,
  config,
  fields,
  type GitHubConfig,
  type LocalConfig,
} from "@keystatic/core";

import { ComponentBlocks } from "~/components/Keystatic/ComponentBlocks";

// import { ComponentBlocks } from "./components/ComponentBlocks";

const storage: LocalConfig["storage"] | GitHubConfig["storage"] =
  process.env.NODE_ENV === "development"
    ? { kind: "local" }
    : {
        kind: "github",
        repo: {
          owner: "zakiego",
          name: "keystatic-blog",
        },
      };

export default config({
  storage,
  // singletons: {
  //   home: singleton({
  //     label: "Home",
  //     path: "content/pages/home/",
  //     schema: {
  //       heading: fields.document({
  //         formatting: {
  //           inlineMarks: {
  //             bold: true,
  //           },
  //         },
  //         label: "Heading (note: text that is bolded will show up in red)",
  //       }),
  //     },
  //   }),
  //   about: singleton({
  //     label: "About",
  //     path: "content/pages/about/",
  //     schema: {
  //       content: fields.document({
  //         formatting: true,
  //         dividers: true,
  //         links: true,
  //         layouts: [
  //           [1, 1],
  //           [1, 1, 1],
  //           [2, 1],
  //           [1, 2, 1],
  //         ],
  //         label: "Content",
  //         componentBlocks: ComponentBlocks,
  //       }),
  //     },
  //   }),
  // },
  collections: {
    // authors: collection({
    //   label: "Authors",
    //   path: "content/authors/*",
    //   slugField: "name",
    //   schema: {
    //     name: fields.slug({
    //       name: {
    //         label: "Name",
    //         validation: {
    //           length: {
    //             min: 1,
    //           },
    //         },
    //       },
    //     }),
    //     role: fields.text({ label: "Role" }),
    //     avatar: fields.image({
    //       label: "Author avatar",
    //       directory: "public/images/authors",
    //     }),
    //   },
    // }),
    posts: collection({
      label: "Posts",
      path: "content/posts/*/",
      slugField: "title",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: {
              length: {
                min: 1,
              },
            },
          },
        }),
        summary: fields.text({
          label: "Summary",
          validation: {
            length: {
              min: 1,
            },
          },
        }),
        publishedDate: fields.date({ label: "Published Date" }),
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
