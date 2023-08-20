export{}

// REPLACED WITH READONLYPAGE.TSX 


// import { useEffect, useState } from 'react';
// import { ddbGetQuestionById } from "../graphql";
// import { ddbGetAllQueryResponse } from '../types';
// import { AskQuestionButton } from '../components/AskQuestionButton';
// import { useParams } from 'react-router-dom';
// import moment from 'moment';
// import { LikeDislikeButtons } from '../components/LikeDislikeButtons';


// export const SingleQuestion = () => {
//     const [question, setQuestion] = useState<ddbGetAllQueryResponse | null>(null);
//     const { quesId, author } = useParams();
//     const [title, setTitle] = useState(null);
//     const [value, setValue] = useState(null);

//     useEffect(() => {
//         const fetchQuestion = async () => {
//             const response = await ddbGetQuestionById(author ?? '', quesId ?? '');
//             const body = JSON.parse(response.body);
//             setQuestion(response);
//             setValue(body);
//             setTitle(body.title);
//             console.log(response);
//         }
//         if (quesId && author && !title && !value) {
//             console.log(`fetching data for author:${author} and quesId ${quesId}`);
//             fetchQuestion();
//         };
//     }, [quesId, title, author, value]);

//     const getTimePassed = (createdAt: string): string => {
//         const startTime = moment();
//         const duration = moment.duration(startTime.diff(moment(createdAt)));
//         return duration.humanize();
//     };

//     const isUpdated = () => {
//         if (question!.createdAt !== question!.updatedAt) {
//             return false;
//         } return true;
//     }
//     return (
//         <div className='flex flex-col items-center w-full'>
//             {question && (
//                 <div className='flex flex-col ml-16 mt-6 w-full'>
//                     <div className='flex flex-row w-full'>
//                         <h2 className='text-4xl text-blue-500 font-bold mb-2 w-full'>{question.title}</h2>
//                         <AskQuestionButton />
//                     </div>
//                     <ul className='flex flex-row w-full'>
//                         <li className='pr-2 text-sm'><span className='text-gray-500'>Asked </span>{`${getTimePassed(question!.createdAt)} ago`}</li>
//                         {isUpdated() &&
//                             <li className='pr-2 text-sm'>{`Edited`}</li>}
//                         <li className='pr-2 text-sm'><span className='text-gray-500'>Viewed </span>{`${question?.views} times`}</li>
//                     </ul>
//                     <div className='flex flex-row mt-7'>
//                         <LikeDislikeButtons />
//                         <p className='mt-1 ml-3'>{question.body}</p>
//                     </div>
//                     <div className='flex flex-row'>
//                         {question.tags.map((tag, index) => (
//                             <a href={`/tags/${tag}`} className=" bg-sky-100 rounded-md my-6 text-blue-600 px-2 mx-1" key={index}>{tag}</a>
//                         )
//                         )}
//                     </div>
//                     <div className='flex flex-col bg-sky-100 rounded-md w-fit py-1 px-4'>
//                         <p className='text-xs text-gray-500'>{`asked ${getTimePassed(question.createdAt)} ago`}</p>
//                         <a className='text-blue-600 w-fit' href={`/users/${question.author}`}>{question.author}</a>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
