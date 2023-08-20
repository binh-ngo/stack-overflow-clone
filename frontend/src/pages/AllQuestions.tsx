import { useEffect, useState } from 'react';
import { ddbGetAllQuestions } from "../graphql"
import { Card } from '../components/Card';
import { ddbGetAllQueryResponse } from '../types';
import { AskQuestionButton } from '../components/AskQuestionButton';


export const AllQuestions = () => {
  const [questions, setQuestions] = useState<ddbGetAllQueryResponse[]>([]);
  const [value, setValue] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
        const response = await ddbGetAllQuestions();
        setQuestions(response); // Set questions directly to the API response
        setValue(response.body); // Assuming you want to set the entire response here
        console.log(response);
    };
    fetchQuestions();
}, []);



  return (
    <div className='flex flex-col items-center w-full'>
      <AskQuestionButton />
      {questions.map((question: ddbGetAllQueryResponse, index) => (
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
};
