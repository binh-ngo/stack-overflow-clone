import { useEffect, useState } from 'react';
import { ddbGetAllQuestionsFromAllUsers } from "../graphql"
import { Card } from '../components/Card';
import { ddbGetAllQueryResponse } from '../types';
import { AskQuestionButton } from '../components/AskQuestionButton';
import moment from 'moment';


export const AllQuestions = () => {
  const [questions, setQuestions] = useState<ddbGetAllQueryResponse[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
        const response = await ddbGetAllQuestionsFromAllUsers();
        setQuestions(response || []); // Set questions directly to the API response
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
      <div className='absolute right-2'>
      <AskQuestionButton />
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
