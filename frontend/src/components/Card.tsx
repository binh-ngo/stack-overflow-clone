import React from 'react';
import { Answer, Comment } from '../types';
import moment from 'moment';
import { ddbDeleteQuestion, ddbUpdateQuestion } from '../graphql';

// Props interface for the card component
interface CardProps {
    title: string;
    body: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    quesId: string;
    answers: [Answer];
    comments: [Comment];
    tags: string[];
    value: any;
}

export const Card: React.FC<CardProps> = ( question: CardProps ) => {
    const isUpdated = () => {
        if (question.createdAt !== question.updatedAt) {
            return false;
        } return true;
    }

    const getTimePassed = (createdAt: string): string => {
        const startTime = moment();
        const duration = moment.duration(startTime.diff(moment(createdAt)));
        return duration.humanize();
    };

    return (
        <div className="flex flex-col border-y-2 p-4 w-full">
            <div className='flex flex-row'>
            <a href={`/questions/${question.quesId}/${question.author}`} className="text-xl text-blue-500 font-bold mb-2 items-center justify-center">{question.title}</a>
            {isUpdated() && <p className='text-gray-600 text-xs mt-2 ml-3'>Edited</p>}
            {/* TODO: If the user is the creator of the post, be able to edit and delete the post */}
            <a href={`/edit/questions/${question.quesId}/${question.author}`} ><button onClick={() => ddbUpdateQuestion(question)} className='border-green-400 border-2 absolute right-0 rounded p-1 px-2 mr-12 -mt-2'>✏️</button></a>
            <button onClick={() => ddbDeleteQuestion(question.quesId, question.author)} className='border-red-400 border-2 absolute right-0 rounded p-1 px-2 mr-2 -mt-2'>❌</button>
            
            </div>
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
                <p className="text-gray-600">Written by <a href={`/users/${question.author}`} className="text-blue-500 font-bold">{`${question.author} `}</a>{` ${getTimePassed(question.createdAt)} ago`}</p>
                <div className='flex flex-row py-2'>
            {question.tags.map((tag,index) => (
                <a href={`/tags/${tag}`} className="bg-sky-200 rounded-md px-1 mx-1" key={index}>{tag}</a>
                ))}
                </div>
            </div>
        </div>
    );
};

