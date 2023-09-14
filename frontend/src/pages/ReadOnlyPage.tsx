import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./page.css";
import ReadOnlyPost from "../components/Lexical/ReadOnlyPost";
import { CreateAnswerProps, ddbGetAllQueryResponse } from "../types";
import { AskQuestionButton } from "../components/AskQuestionButton";
// import { LikeDislikeButtons } from "../components/LikeDislikeButtons";
import moment from "moment";
import Editor from "../components/Lexical/Editor";
import { Auth } from "aws-amplify";
import { ddbGetQuestionById } from "../graphql/questions";
import { ddbCreateAnswer } from "../graphql/answers";



const ReadonlyPage = (props:CreateAnswerProps) => {
  const [question, setQuestion] = useState<ddbGetAllQueryResponse | null>(null);
  const [answers, setAnswers] = useState([]);
  const [title, setTitle] = useState(null);
  const [value, setValue] = useState(null);
  const [children, setChildren]: any = useState(props.children);
  const [answerAuthor, setAnswerAuthor] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const quesId = searchParams.get('quesId');
  const quesAuthor = searchParams.get('author');

  useEffect(() => {
    async function fetchUserData() {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setAnswerAuthor(currentUser.username);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, []);


  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await ddbGetQuestionById(quesAuthor ?? '', quesId ?? '');
      if (response) {
        const body = JSON.parse(response.body);
        setQuestion(response);
        setValue(body);
        setTitle(response.title);
        console.log(response);
      }
    };
    if (quesId && quesAuthor && !title && !value) {
      console.log(`fetching data for quesId: ${quesId} and author: ${question?.author}`);
      // const answerResponse = await ddbGetAnswers
      fetchQuestion();
    }
  }, [quesId, question?.author, quesAuthor, title, value]);

  console.log("Rendering ReadonlyPage");

  const isUpdated = () => {
    if (question!.createdAt !== question!.updatedAt) {
      return false;
    } return true;
  }

  const getTimePassed = (createdAt: string): string => {
    const startTime = moment();
    const duration = moment.duration(startTime.diff(moment(createdAt)));
    return duration.humanize();
  };

  const handleChange = (children: any) => {
    // console.log(`children: ${JSON.stringify(children, null, 2)}`);
    setChildren(children);
  };

  const handleSave = async () => {
    // console.log(JSON.stringify(editorJson, null, 2));
      console.log("onSave called");
      // console.log(`children: ${JSON.stringify(children, null, 2)}`);
      const answer = {
        answerAuthor: answerAuthor ? answerAuthor : 'Unknown',
        body: children,
        quesId: quesId ? quesId : '',
        quesAuthor: quesAuthor ? quesAuthor : ''
      };
      
      let createdAnswer = null;
      const response = await ddbCreateAnswer(answer);
      if ('data' in response) {
        // Handle the case when response is a GraphQL result
        createdAnswer = response.data.createAnswer;
        console.log(`Response from DynamoDB: ${JSON.stringify(createdAnswer)}`);
      } else {
        // Handle the case when response is an Observable object (if needed)
        console.error('Response is not a GraphQL result:', response);
      } if (createdAnswer) {
        window.location.reload();
      } else {
        console.log("onSave called but title or children are empty");
      }
  };

  return (
    <>
    {/* QUESTION section */}
      <div className='flex flex-col items-center w-full'>
        {question && (
          <div className='flex flex-col ml-16 mt-6 w-full'>
            <div className='flex flex-row w-full justify-around'>
              <h2 className='text-4xl text-blue-500 font-bold mb-2 w-full'>{question.title}</h2>
              {/* <LikeDislikeButtons /> */}
              <div className="absolute right-8">
              <AskQuestionButton />
              </div>
            </div>
            <ul className='flex flex-row w-full'>
              <li className='pr-2 text-sm'><span className='text-gray-500'>Asked </span>{`${getTimePassed(question!.createdAt)} ago`}</li>
              {isUpdated() &&
                <li className='pr-2 text-sm'>{`Edited`}</li>}
              <li className='pr-2 text-sm'><span className='text-gray-500'>Viewed </span>{`${question?.views} times`}</li>
            </ul>
            <div className='flex flex-row mt-7'>
              {value && <ReadOnlyPost children={value} />}
            </div>
            <div className='flex flex-row'>
              {question.tags.map((tag, index) => (
                <a href={`/tag?tag=${tag}`} className=" bg-sky-100 rounded-md my-6 text-blue-600 px-2 mx-1" key={index}>{tag}</a>
              )
              )}
            </div>
            <div className='flex flex-col bg-sky-100 rounded-md w-fit py-1 px-4'>
              <p className='text-xs text-gray-500'>{`asked ${getTimePassed(question.createdAt)} ago`}</p>
              <a className='text-blue-600 w-fit' href={`/author?author=${question.author}`}>{question.author}</a>
            </div>
          </div>
        )}
        {/* Answer Section */}
        
        {/* Editor Section */}
        <Editor
          // readOnly={props.readOnly}
          onChange={handleChange}
          children={children}
        />
                <button className="text-white bg-orange-500 h-20 p-2 text-lg rounded-md" onClick={handleSave}>Save</button>

      </div>
    </>
  );
};

export default ReadonlyPage;