import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import { visit } from "unist-util-visit";

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.@(md|mdx)`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    category: {
      type: "string",
      description: "The category of the post",
      required: false,
    },
    status: {
      type: "string",
      description: "The status of the post",
      required: false,
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
    description: {
      type: "string",
      description: "The summary of the post",
      required: true,
    },
    tags: {
      type: "list",
      of: {
        type: "string",
      },
      description: "The tags of the post",
      required: false,
    },
  },
}));

const options = {
  theme: {
    light: "rose-pine-dawn",
    dark: "rose-pine",
  },
};

export default makeSource({
  contentDirPath: "content/blog/dev/",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [codeEl] = node.children;

            if (codeEl.tagName !== "code") return;

            node.raw = codeEl.children?.[0].value;
          }
        });
      },
      [rehypePrettyCode, options],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "figure") {
            if (!("data-rehype-pretty-code-figure" in node.properties)) {
              return;
            }

            for (const child of node.children) {
              if (child.tagName === "figcaption") {
                child.properties["raw"] = node.raw;
              }
            }
          }
        });
      },
    ],
  },
});
