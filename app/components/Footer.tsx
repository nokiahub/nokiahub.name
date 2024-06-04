const Footer = () => {
  return (
    <footer className={"p-4 py-16"}>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://nextjs.org/">Next.js</a>
    </footer>
  );
};

export default Footer;
