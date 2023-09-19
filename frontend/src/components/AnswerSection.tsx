import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ddbGetAllAnswersResponse } from "../types";
import moment from "moment";

import { ddbGetAllAnswers } from "../graphql/answers";
import ReadOnlyPost from "./Lexical/ReadOnlyPost";



const AnswerSection = () => {

    const [answers, setAnswers] = useState<ddbGetAllAnswersResponse[]>([]);
    const [value, setValue] = useState(null);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const quesId = searchParams.get('quesId');

    useEffect(() => {
        const fetchAnswers = async () => {
                const response = await ddbGetAllAnswers(quesId ?? '');
                if (response && response.body) {
                    const body = JSON.parse(response.body);
                    setAnswers(response);
                    setValue(body);
                    console.log(`RESPONSE~~~~~~~~~~~~~~~~~~${response}`);
                }
        }
            fetchAnswers();
        }, [quesId]);

    const getTimePassed = (createdAt: string): string => {
        const startTime = moment();
        const duration = moment.duration(startTime.diff(moment(createdAt)));
        return duration.humanize();
    };

    console.log(value)
    return (
        <>
            {/* Answer Section */}
            <div className="my-20 w-full">
                {answers.map((answer: ddbGetAllAnswersResponse) => (
                    <div className="w-fit m-4 p-4 border-2">
                        <p className="text-2xl text-blue-500">{answer.author}</p>
                        {answer.body && <ReadOnlyPost children={answer.body} />}
                        <p> {answer.body} </p>
                        <p>answered {getTimePassed(answer.createdAt)} ago</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AnswerSection;