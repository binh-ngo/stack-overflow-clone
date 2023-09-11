import { useEffect, useState } from 'react';
import { AskQuestionButton } from '../components/AskQuestionButton';
import { ddbGetAllTags } from '../graphql';
import { ddbGetAllTagsResponse } from '../types';

// TODO: Have search bar filter displayed tags after each keystroke

export const AllAuthors = () => {
  const [tags, setTags] = useState<ddbGetAllTagsResponse[]>([]);
  
  useEffect(() => {
    const fetchQuestions = async () => {
        const response = await ddbGetAllTags();
        setTags(response || []); 
        console.log(response);
    };
    fetchQuestions();
}, []);

  return (
    <>
    <div className='absolute right-2'>
    <AskQuestionButton />
    </div>
  <div className='flex flex-col items-center w-full mt-16'>
    {tags.map((tag: ddbGetAllTagsResponse) => (
      <div>
        <p>{tag.tagName}</p>
      </div>
        ))}
  </div>
        </>  )
}
