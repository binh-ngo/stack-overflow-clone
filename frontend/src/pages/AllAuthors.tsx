import { useEffect, useState } from 'react';
import { AskQuestionButton } from '../components/AskQuestionButton';
import { ddbGetAllAuthors } from '../graphql/authors';
import { ddbGetAllAuthorsResponse } from '../types';

// TODO: Have search bar filter displayed tags after each keystroke

export const AllAuthors = () => {
  const [authors, setAuthors] = useState<ddbGetAllAuthorsResponse[]>([]);
  
  useEffect(() => {
    const fetchQuestions = async () => {
        const response = await ddbGetAllAuthors();
        setAuthors(response || []); 
        console.log(response);
    };
    fetchQuestions();
}, []);

  return (
    <>
    <div className='absolute right-0 -mt-3 z-40'>
    <AskQuestionButton />
    </div>
    <div className="mt-2 border-b-2 absolute left-40 text-3xl text-blue-500 font-bold mb-2 w-full">
        <h1 className='ml-2'>Authors</h1>
      </div>
      <div className='flex flex-row justify-between mt-16'>
    {authors.map((author: ddbGetAllAuthorsResponse) => (
      <div>
        <a href={`/author?author=${author.authName}`}><p className='text-2xl bg-sky-100 rounded-md my-6 text-blue-600 py-2 px-4 mx-8'>{author.authName}</p></a>
      </div>
        ))}
  </div>
        </>  
  )
}
