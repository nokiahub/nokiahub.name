export const devTagNames = [
  "all",
  "blog making",
  "git",
  "react",
  "nextjs",
  "remix",
  "web",
  "typescript",
  "javascript",
];

export const devTags = devTagNames.map((name) => ({
  name,
  href: `/posts/tag/${name}`,
}));

export const etcTagNames = ["all", "travel", "music"];

export const etcTags = etcTagNames.map((name) => ({
  name,
  href: `/etc/tag/${name}`,
}));
