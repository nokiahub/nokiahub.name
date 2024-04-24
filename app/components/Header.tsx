import Link from 'next/link';
import React from 'react';
import ThemeSwitchToggle from './ThemeSwitchTogle';
import GithubIcon from '../icons/GithubIcon';
import { AboutIcon } from '../icons/AboutIcon';

export const Header = () => {
  return (
    <nav className={wrapperStyle}>
      <div>
        <Link href={'/'}>형주의 블로그</Link>
      </div>
      <div className={'flex gap-[1.5rem]'}>
        <div className={linkItemStyle}>
          <Link href={'/projects'}>Projects</Link>
        </div>
        <div className={linkItemStyle}>
          <ThemeSwitchToggle />
        </div>
        <div className={linkItemStyle}>
          <Link target="_blank" href="https://github.com/nokiahub" aria-label="my github account">
            <GithubIcon />
          </Link>
        </div>
        <div className={linkItemStyle}>
          <Link href="/app/about/page" aria-label="about me">
            <AboutIcon />
          </Link>
        </div>
      </div>
    </nav>
  );
};

const wrapperStyle =
  'flex justify-between items-center fixed top-0 left-0 cursor-pointer z-1000 w-full border-b bg-background text-2xl p-[1.25rem] pt-[0.75rem] pb-[1rem]';

const linkItemStyle = 'flex flex-col justify-center text-lg m-0';
