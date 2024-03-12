import createMDX from "@next/mdx";

// Remark plugins
import rehypeMdxCodeProps from "rehype-mdx-code-props";

// Rehype plugins
import rehypeHighlight from "rehype-highlight";

import { default as langCpp } from "highlight.js/lib/languages/cpp";
import { default as langCSharp } from "highlight.js/lib/languages/csharp";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [
      [rehypeHighlight, { languages: { cpp: langCpp, cs: langCSharp } }],
      rehypeMdxCodeProps,
    ],
  },
});

export default withMDX(nextConfig);
