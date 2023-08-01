import React from 'react';

// Props interface for the card component
interface CardProps {
    title: String;
    body: String;
    author: String;
    createdAt: String;
    updatedAt: String;
    quesId: String;
    // answers: [Answer];
    // comments: [Comment];
}

export const Card: React.FC<CardProps> = ({ title, body, author, createdAt, updatedAt, quesId }) => {
    const isUpdated = () => {
        if (createdAt !== updatedAt) {
            return false;
        } return true;
    }
    // add under questions block later
    //     <div>
    //     {comments.map((comment) => (
    //         <div>
    //             <p>{comment.body}</p>
    //         </div>
    //     ))}
    // </div>
    // <div>
    //     {/* Question's answers with the answer's comments */}
    //     {answers.map((answer) => (
    //         <div>
    //             <p>{answer.body}</p>
    //             {answer.comments.map((comment) => (
    //                 <div>
    //                     <p>{comment.body}</p>
    //                 </div>
    //             ))}
    //         </div>
    //     ))}
    // </div>
    return (
        <div className="flex flex-col border-y-2 p-4 w-full">
            {isUpdated() && <p>edited</p>}
            <a href={`/questions/${author}/${quesId}`} className="text-xl text-blue-500 font-bold mb-2 items-center justify-center">{title}</a>
            <p className="text-gray-600 py-2">{body}</p>
            {/* Question's Comment Block */}
            <div className=''>
            <p className="text-gray-600">Written by <a href={`/users/${author}`} className="text-blue-500 font-bold">{`${author} `}</a>{`on ${createdAt}`}</p>
            </div>
        </div>
    );
};

