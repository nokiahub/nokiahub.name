import Link from 'next/link';
import ThemeSwitchToggle from './ThemeSwitchTogle';
import GithubIcon from '../icons/GithubIcon';
import { AboutIcon } from '../icons/AboutIcon';

export const Header = () => {
  return (
    <nav className={'bg-inherit  flex justify-between items-center fixed top-0 left-0 w-full border-b p-[1.25rem] pt-[0.75rem] pb-[1rem]'}>
      <div className={"bg-opacity-10"}>
        <Link href={'/'}>형주의 블로그</Link>
      </div>
      <div className={'flex gap-[1.5rem]'}>
        <div className={'flex flex-col justify-center text-lg m-0'}>
          <ThemeSwitchToggle />
        </div>
        <div className={'flex flex-col justify-center text-lg m-0'}>
          <Link target="_blank" href="https://github.com/nokiahub" aria-label="my github account">
            <GithubIcon />
          </Link>
        </div>
        <div className={'flex flex-col justify-center text-lg m-0'}>
          <Link href="/about" aria-label="about me">
            <AboutIcon />
          </Link>
        </div>
      </div>
    </nav>
  );
};

