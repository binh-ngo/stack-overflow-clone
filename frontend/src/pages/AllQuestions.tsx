import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { ddbGetAllQueryResponse } from '../types';
import { AskQuestionButton } from '../components/AskQuestionButton';
import moment from 'moment';
import { ddbGetAllQuestionsFromAllUsers } from '../graphql/questions';


export const AllQuestions = () => {
  const [questions, setQuestions] = useState<ddbGetAllQueryResponse[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
        const response = await ddbGetAllQuestionsFromAllUsers();
        setQuestions(response || []); 
        console.log(response);
    };
    fetchQuestions();
}, []);

const renderQuestions = () => {
  const sortedQuestions = questions.sort(
    (a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
  );
  return (
    <>
    <div className='absolute right-0 -mt-3 z-40'>
      <AskQuestionButton />
      </div>
      <div className="mt-2 border-b-2 absolute left-36 text-3xl text-blue-500 font-bold mb-2 w-full">
        <h1 className='ml-2'>Recent questions</h1>
      </div>
    <div className='flex flex-col items-center w-full mt-16'>
      {sortedQuestions.map((question: ddbGetAllQueryResponse, index) => (
        <Card
          key={index}
          title={question.title}
          body={question.body}
          author={question.author}
          createdAt={question.createdAt}
          quesId={question.quesId}
          updatedAt={question.updatedAt}
          tags={question.tags}
          />
          ))}
    </div>
          </>
  );
}
return (
  <>
    {renderQuestions()}
  </>
 )
};
