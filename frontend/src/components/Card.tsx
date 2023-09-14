import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Auth } from 'aws-amplify';
import { ddbDeleteQuestion, ddbUpdateQuestion } from '../graphql/questions';

// Props interface for the card component
interface CardProps {
    title: string;
    body: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    quesId: string;
    tags: string[];
}

export const Card: React.FC<CardProps> = (question: CardProps) => {

    const [user, setUser] = useState("");

    useEffect(() => {
        // Fetch the currently authenticated user
        async function fetchUser() {
            try {
                const currentUser = await Auth.currentAuthenticatedUser();
                setUser(currentUser.username);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        }

        fetchUser();
    }, []);

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


    const isAuthor = question.author === user;


    return (
        <div className="flex flex-col border-b-2 p-4 w-full">
            <div className='flex flex-row'>
                <a href={`/question?quesId=${question.quesId}&author=${question.author}`}
                    className="text-xl text-blue-500 font-bold mb-2 items-center justify-center">{question.title}</a>
                {isUpdated() && <p className='text-gray-600 text-xs mt-2 ml-3'>Edited</p>}
                {/* TODO: If the user is the creator of the post, be able to edit and delete the post */}
                {isAuthor && (
                    <>
                        <a href={`/edit/question?quesId=${question.quesId}&author=${question.author}`} ><button onClick={() => ddbUpdateQuestion(question)} className='border-green-400 border-2 absolute right-0 rounded p-1 px-2 mr-12 -mt-2'>✏️</button></a>
                        <button onClick={() => ddbDeleteQuestion(question.quesId, question.author)} className='border-red-400 border-2 absolute right-0 rounded p-1 px-2 mr-2 -mt-2'>❌</button>
                    </>
                )}
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
            <div>
                <p className="text-gray-600">Written by <a href={`/author?author=${question.author}`} className="text-blue-500 font-bold">{`${question.author} `}</a><span className='text-xs text-gray-400'>{` ${getTimePassed(question.createdAt)} ago`}</span></p>
                <div className='flex flex-row py-2'>
                    {question.tags.map((tag, index) => (
                        <a href={`/tag?tag=${tag}`} className="bg-sky-200 rounded-md px-1 mx-1" key={index}>{tag}</a>
                    ))}
                </div>
            </div>
        </div>
    );
};

