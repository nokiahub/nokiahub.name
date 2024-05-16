import { defineDocumentType,  makeSource } from 'contentlayer/source-files'
import rehypePrettyCode from 'rehype-pretty-code';

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.@(md|mdx)`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    category: {
      type: 'string',
      description: 'The category of the post',
      required: false,
    },
    status: {
      type: 'string',
      description: 'The status of the post',
      required: false,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    description: {
      type: 'string',
      description: 'The sammary of the post',
      required: true,
    },
    tags: {
      type: 'list',
      of: {
        type: 'string',
      },
      description: 'The tags of the post',
      required: false,
    },
  }
}));

const options = {};

export default makeSource({
  contentDirPath: 'content/blog/dev/',
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [[rehypePrettyCode, options]]
  }
});
