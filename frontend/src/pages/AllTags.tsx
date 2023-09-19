import { useEffect, useState } from 'react';
import { AskQuestionButton } from '../components/AskQuestionButton';
import { ddbGetAllTags } from '../graphql/tags';
import { ddbGetAllTagsResponse } from '../types';

// TODO: Have search bar filter displayed tags after each keystroke

export const AllTags = () => {
  const [tags, setTags] = useState<ddbGetAllTagsResponse[]>([]);
  
  useEffect(() => {
    const fetchQuestions = async () => {
        const response = await ddbGetAllTags();
        const sortedTags = response.sort((a:any, b:any) =>
        a.tagName.localeCompare(b.tagName)
      );
        setTags(sortedTags || []); 
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
        <h1 className='ml-2'>Tags</h1>
      </div>
      <div className='flex flex-row justify-between mt-16'>
    {tags.map((tag: ddbGetAllTagsResponse) => (
      <div>
        <a href={`/tag?tag=${tag.tagName}`}><p className='text-2xl bg-sky-100 rounded-md my-6 text-blue-600 py-2 px-4 mx-8'>{tag.tagName}</p></a>
      </div>
        ))}
  </div>
        </>  )
}
