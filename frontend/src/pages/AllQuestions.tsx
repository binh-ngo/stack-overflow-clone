import { useEffect, useState } from 'react';
import { ddbGetAllQuestions } from "../graphql"
import { Card } from '../components/Card';
import { ddbGetAllQueryResponse } from '../types';
import { AskQuestionButton } from '../components/AskQuestionButton';


export const AllQuestions = () => {
  const [questions, setQuestions] = useState<ddbGetAllQueryResponse[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
          // error happens here vvv
          const response = await ddbGetAllQuestions();
          setQuestions(response);
          console.log(response)
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
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
          // answers={question.answers}
          // comments={question.comments}
          updatedAt={question.updatedAt}

          />
      ))}
    </div>
  );
};
