import { withContentlayer } from "next-contentlayer";
export default withContentlayer({
  images: {
    remotePatterns: [
      {
        hostname: "d28uuyslcox01d.cloudfront.net",
        protocol: "https",
      },
    ],
  },
});
