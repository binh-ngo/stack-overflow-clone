import { useState } from "react";

const fruits: string[] = [
    "Apple", "Banana", "bend", "Orange", "Mango", "Pineapple", "Grapes", "Watermelon"
    ];

export default function SearchComponent() {
    const [searchValue, setSearchValue] = useState('');
  
    const filteredFruits = fruits.filter(fruit => fruit.toLowerCase().startsWith(searchValue.toLowerCase()));
  
    const showDropdown = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    };
    return (
        <div>
            <form className="max-w-lg w-6/12 px-4 sm:w-full">
                <div className="relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full py-1 pl-10 pr-12 text-sm text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                        value={searchValue}
                        onChange={showDropdown}                
                    />
                </div>
            </form>
            {/* TODO: Take whatever search query and query for all questions, answers
                      and comments in the PostDB and GET a list of relevant posts */}
            {searchValue !== "" && (
                <div className="dropdown-content mt-1 border border-gray-400 rounded-md bg-white absolute w-64">
                    {filteredFruits.map((fruit, index) => (
                        <div
                            key={index}
                            className="dropdown-item p-2 cursor-pointer hover:bg-gray-300"
                            onClick={() => setSearchValue(fruit)}
                        >
                            {fruit}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}