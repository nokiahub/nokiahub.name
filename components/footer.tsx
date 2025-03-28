const Footer = () => {
  return (
    <footer className={"flex flex-col items-center gap-3 bg-secondary p-20"}>
      <div>
        © {new Date().getFullYear()}, Built with
        <a href="https://nextjs.org/"> Next.js</a>
      </div>
      <p>Copyright © 2024 - All right reserved</p>
    </footer>
  );
};

export default Footer;
