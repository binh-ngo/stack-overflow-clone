import { Link } from 'react-router-dom';

export const AskQuestionButton = () => {
    return (
        <div className="text-sm w-full flex justify-start z-50">
            <Link to="/questions/create">
                <button className="flex text-blue-800 bg-sky-100 p-2 px-4 py-3 rounded-l-lg my-3">
                    Ask a Question
                </button>
            </Link>
        </div>
    )
}
