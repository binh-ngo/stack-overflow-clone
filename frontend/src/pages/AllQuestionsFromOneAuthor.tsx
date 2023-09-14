import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { ddbGetAllQueryResponse } from '../types';
import { AskQuestionButton } from '../components/AskQuestionButton';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { ddbGetAllQuestions } from '../graphql/questions';

export const AllQuestionsFromOneAuthor = () => {
  const [questions, setQuestions] = useState<ddbGetAllQueryResponse[]>([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const author = searchParams.get('author');
console.log(author)

  useEffect(() => {
    const fetchQuestions = async () => {
        const response = await ddbGetAllQuestions(author ? author : "");
        setQuestions(response); // Set questions directly to the API response
        console.log(response);
    };
    fetchQuestions();
}, [author]);

const renderQuestions = () => {
  const sortedQuestions = questions.sort(
    (a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
  );

  return (
    <>
      <div className="mt-2 border-b-2 absolute left-36 text-3xl text-blue-500 font-bold mb-2 w-full">
        <h1>{author}'s questions</h1>
      </div>
      <div className='absolute right-4 -mt-2'>
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
