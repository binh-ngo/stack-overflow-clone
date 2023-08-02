import React from 'react';
import { Answer, Comment } from '../types';

// Props interface for the card component
interface CardProps {
    title: String;
    body: String;
    author: String;
    createdAt: String;
    updatedAt: String;
    quesId: String;
    answers: [Answer];
    comments: [Comment];
}

export const Card: React.FC<CardProps> = ({ title, body, author, createdAt, updatedAt, quesId, answers, comments }) => {
    const isUpdated = () => {
        if (createdAt !== updatedAt) {
            return false;
        } return true;
    }
    return (
        <div className="flex flex-col border-y-2 p-4 w-full">
            <div className='flex flex-row'>
            <a href={`/questions/${quesId}/${author}`} className="text-xl text-blue-500 font-bold mb-2 items-center justify-center">{title}</a>
            {isUpdated() && <p className='text-gray-600 text-xs mt-2 ml-3'>edited</p>}
            </div>
            <p className="text-gray-600 py-2">{body}</p>
            {/* Question's Comment Block */}
            {/* <div>
                {comments.map((comment) => (
                    <div>
                        <p>{comment.body}</p>
                    </div>
                ))}
            </div>
            <div> */}
                {/* Question's answers with the answer's comments */}
                {/* {answers.map((answer) => (
                    <div>
                        <p>{answer.body}</p>
                        {answer.comments.map((comment) => (
                            <div>
                                <p>{comment.body}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div> */}
            <div className=''>
                <p className="text-gray-600">Written by <a href={`/users/${author}`} className="text-blue-500 font-bold">{`${author} `}</a>{`on ${createdAt}`}</p>
            </div>
        </div>
    );
};

