import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import { AccountContext } from "../Accounts";
import "./page.css";
import { ddbGetQuestionById } from "../graphql";
import ReadOnlyPost from "../components/Lexical/ReadOnlyPost";
import { CreateQuestionProps, ddbGetAllQueryResponse } from "../types";
import { AskQuestionButton } from "../components/AskQuestionButton";
// import { LikeDislikeButtons } from "../components/LikeDislikeButtons";
import moment from "moment";
import Editor from "../components/Lexical/Editor";



const ReadonlyPage = (props:CreateQuestionProps) => {
  const [question, setQuestion] = useState<ddbGetAllQueryResponse | null>(null);
  const [title, setTitle] = useState(null);
  const [value, setValue] = useState(null);
  const [children, setChildren]: any = useState(props.children);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const quesId = "QUESTION#" + searchParams.get('quesId');
  const author = "AUTHOR#" + searchParams.get('author');
  // const { loggedInUser } = useContext(AccountContext);

  // let navigate = useNavigate();


  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await ddbGetQuestionById(author ?? '', quesId ?? '');
      if (response) {
        const body = JSON.parse(response.body);
        setQuestion(response);
        setValue(body);
        setTitle(response.title);
        console.log(response);
      }
    };
    if (quesId && author && !title && !value) {
      console.log(`fetching data for quesId: ${quesId} and author: ${author}`);
      fetchQuestion();
    }
  }, [quesId, author, title, value]);

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

  const formattedAuthor = question ? (question.author ? question.author.substring(7).trim().replace(/\s+/g, "") : "") : "";

  return (
    <>
      {/* {loggedInUser && (
        <button
          className="edit-page-link"
          onClick={() => navigate(`/edit/questions/${quesId}/${author}`)}
        >
          Edit this page
        </button>
      )} */}
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
              <a className='text-blue-600 w-fit' href={`/author?author=${formattedAuthor}`}>{formattedAuthor}</a>
            </div>
          </div>
        )}
        <Editor
          // readOnly={props.readOnly}
          onChange={handleChange}
          children={children}
        />
      </div>
    </>
  );
};

export default ReadonlyPage;