import GithubIcon from "@/app/icons/GithubIcon";

const Footer = () => {
  return (
    <footer className={"footer footer-center p-10"}>
      <a
        target="_blank"
        href="https://github.com/nokiahub"
        aria-label="my github account"
      >
        <GithubIcon />
      </a>
      <aside className={"grid-flow-col items-center"}>
        © {new Date().getFullYear()}, Built with
        <a href="https://nextjs.org/">Next.js</a>
        <p>Copyright © 2024 - All right reserved</p>
      </aside>
    </footer>
  );
};

export default Footer;
