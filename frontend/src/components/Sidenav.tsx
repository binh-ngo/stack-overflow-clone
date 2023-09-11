export const Sidenav = () => {

  return (
    <nav
      className="relative left-0 top-0 h-full w-4/12 sm:w-3/12 md:w-2/12 xl:w-1/12 bg-white border-r-2"
    >
      <ul className="relative m-0 list-none px-[0.2rem]">
        <li className="relative">
          <a
            href="/"
            className={`font-bold text-gray-600 hover:text-orange-500 flex h-12 items-center px-6 py-4 transition duration-300 ease-linear hover:outline-none focus:outline-none`}
          >
            <span>Home</span>
          </a>
        </li>
        <li className="relative">
          <a
            href="/questions"
            className={`font-bold text-gray-600 hover:text-orange-500 flex h-12 items-center px-6 py-4 transition duration-300 ease-linear hover:outline-none focus:outline-none`}
          >
            <span>Questions</span>
          </a>
        </li>
        <li className="relative">
          <a
            href="/authors"
            className={`font-bold text-gray-600 hover:text-orange-500 flex h-12 items-center px-6 py-4 transition duration-300 ease-linear hover:outline-none focus:outline-none`}
          >
            <span>Authors</span>
          </a>
        </li>
        <li className="relative">
          <a
            href="/tags"
            className={`font-bold text-gray-600 hover:text-orange-500 flex h-12 items-center px-6 py-4 transition duration-300 ease-linear hover:outline-none focus:outline-none`}
          >
            <span>Tags</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

