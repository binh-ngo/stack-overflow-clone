import { useState } from 'react';

export const Sidenav = () => {
  const [activeLink, setActiveLink] = useState('Home');

  const handleLinkClick = (link:any) => {
    setActiveLink(link);
  };

  return (
    <nav
      className="relative left-0 top-0 h-full w-4/12 sm:w-3/12 md:w-2/12 xl:w-1/12 bg-white border-r-2"
    >
      <ul className="relative m-0 list-none px-[0.2rem]">
        <li className="relative">
          <a
            href="/"
            className={`font-bold ${activeLink === 'Home' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'} flex h-12 items-center px-6 py-4 transition duration-300 ease-linear hover:outline-none focus:outline-none`}
            onClick={() => handleLinkClick("Home")}
          >
            <span>Home</span>
          </a>
        </li>
        <li className="relative">
          <a
            href="/questions"
            className={`font-bold ${activeLink === 'Questions' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'} flex h-12 items-center px-6 py-4 transition duration-300 ease-linear hover:outline-none focus:outline-none`}
            onClick={() => handleLinkClick("Questions")}
          >
            <span>Questions</span>
          </a>
        </li>
        <li className="relative">
          <a
            href="/users"
            className={`font-bold ${activeLink === 'Users' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'} flex h-12 items-center px-6 py-4 transition duration-300 ease-linear hover:outline-none focus:outline-none`}
            onClick={() => handleLinkClick("Users")}
          >
            <span>Users</span>
          </a>
        </li>
        <li className="relative">
          <a
            href="/tags"
            className={`font-bold ${activeLink === 'Tags' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'} flex h-12 items-center px-6 py-4 transition duration-300 ease-linear hover:outline-none focus:outline-none`}
            onClick={() => handleLinkClick("Tags")}
          >
            <span>Tags</span>
          </a>
        </li>
        <li className="relative">
          <a
            href="/companies"
            className={`font-bold ${activeLink === 'Companies' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'} flex h-12 items-center px-6 py-4 transition duration-300 ease-linear hover:outline-none focus:outline-none`}
            onClick={() => handleLinkClick("Companies")}
          >
            <span>Companies</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

