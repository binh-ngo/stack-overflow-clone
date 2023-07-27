import React, { useRef } from 'react';

export const Sidenav: React.FC = () => {
  const sidenavMenuRef = useRef<HTMLUListElement>(null);
  const sidenavLinkRef = useRef<HTMLAnchorElement>(null);

  return (
    <nav
      id="sidenav-1"
      className="relative left-0 top-0 h-full w-48 -translate-x-full bg-white border-r-2 data-[te-sidenav-hidden='false']:translate-x-0"
      data-te-sidenav-hidden="false"
    >
      <ul className="relative m-0 list-none px-[0.2rem]" ref={sidenavMenuRef} data-te-sidenav-menu-ref>
        <li className="relative">
          <a
            href="/"
            className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-500 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
            ref={sidenavLinkRef}
            data-te-sidenav-link-ref
          >
            <span className='text-orange-600'>Home</span>
          </a>
        </li>
        <li className="relative">
          <a
            href="/questions"
            className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-500 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
            ref={sidenavLinkRef}
            data-te-sidenav-link-ref
          >
            <span>Questions</span>
          </a>
        </li>
        <li className="relative">
          <a
            href="/users"
            className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-500 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
            ref={sidenavLinkRef}
          >
            <span>Users</span>
          </a>
        </li>
        <li className="relative">
          <a
            href="/tags"
            className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-500 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
            ref={sidenavLinkRef}
          >
            <span>Tags</span>
          </a>
        </li>
        <li className="relative">
          <a
            href="/companies"
            className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-500 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
            ref={sidenavLinkRef}
          >
            <span>Companies</span>
          </a>
        </li>
        
      </ul>
    </nav>
  );
};