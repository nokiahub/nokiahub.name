import GithubIcon from "@/components/icons/GithubIcon";

const Footer = () => {
  return (
    <footer className={"flex flex-col items-center gap-3 p-10"}>
      <a
        target="_blank"
        href="https://github.com/nokiahub"
        aria-label="my github account"
      >
        <GithubIcon />
      </a>
      <div>
        © {new Date().getFullYear()}, Built with
        <a href="https://nextjs.org/">Next.js</a>
      </div>
      <p>Copyright © 2024 - All right reserved</p>
    </footer>
  );
};

export default Footer;
