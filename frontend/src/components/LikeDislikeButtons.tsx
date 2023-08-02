import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi'

export const LikeDislikeButtons: React.FC = () => {

  return (
    <div className="flex flex-col w-fit">
      <button
        className="px-3 py-3 my-1 rounded-full text-black border-2"
      >
        <BiSolidUpArrow />
      </button>
      <button
        className="px-3 py-3 my-1 rounded-full text-black border-2"
      >
        <BiSolidDownArrow />
      </button>
    </div>
  );
};

