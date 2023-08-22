import { useEffect, useState } from 'react';
import { ddbGetAllQuestions } from "../graphql"
import { Card } from '../components/Card';
import { ddbGetAllQueryResponse } from '../types';
import { AskQuestionButton } from '../components/AskQuestionButton';
import moment from 'moment';
import { useParams } from 'react-router-dom';


export const AllQuestionsFromOneUser = () => {
  const [questions, setQuestions] = useState<ddbGetAllQueryResponse[]>([]);
  const [value, setValue] = useState({});
  const { author = '' } = useParams<{ author?: string }>(); // Provide default value

  useEffect(() => {
    const fetchQuestions = async () => {
        const response = await ddbGetAllQuestions(author);
        setQuestions(response); // Set questions directly to the API response
        setValue(response.body); // Assuming you want to set the entire response here
        console.log(response);
    };
    fetchQuestions();
}, [author]);

const renderQuestions = () => {
  const sortedQuestions = questions.sort(
    (a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
  );
  return (
    <div className='flex flex-col items-center w-full'>
      <AskQuestionButton />
      {sortedQuestions.map((question: ddbGetAllQueryResponse, index) => (
        <Card
          key={index}
          title={question.title}
          body={question.body}
          author={question.author}
          createdAt={question.createdAt}
          quesId={question.quesId}
          answers={question.answers}
          comments={question.comments}
          updatedAt={question.updatedAt}
          tags={question.tags}
          value={value}
        />
      ))}
    </div>
  );
}
return (
  <>
    {renderQuestions()}
  </>
 )
};
