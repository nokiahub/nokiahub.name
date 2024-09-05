import Github from "@/components/icons/github";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className={"flex flex-col items-center gap-3 p-10"}>
      <div>
        © {new Date().getFullYear()}, Built with
        <a href="https://nextjs.org/"> Next.js</a>
      </div>
      <p>Copyright © 2024 - All right reserved</p>
    </footer>
  );
};

export default Footer;
