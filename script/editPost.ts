import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { parse, stringify } from "yaml";

const main = () => {
  const posts = fs.readdirSync("./content/posts");

  posts.forEach((post) => {
    const path = `./content/posts/${post}/index.yaml`;
    let postContent = fs.readFileSync(path, {
      encoding: "utf-8",
    });

    if (!postContent) return;

    // const tags = parse(postContent);

    // if (!tags.id) {
    //   tags.id = uuidv4();
    // }

    // add one paragraph
    postContent += `id: ${uuidv4()}`;

    fs.writeFileSync(path, postContent, {
      encoding: "utf-8",
    });
  });
};

main();
