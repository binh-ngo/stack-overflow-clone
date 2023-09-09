import { useEffect } from "react";
import { useState } from "react";
import { ddbCreateQuestion, ddbGetQuestionById, SaveQuestionProps } from "../graphql";
import Editor from "../components/Lexical/Editor.js";
import "../components/Lexical/styles.css"
import { useLocation } from "react-router-dom";
import { ddbGetAllQueryResponse } from "../types";

type CreateQuestionProps = {
  // onSave: (title: string, content: string) => void;
  onSave: (question: SaveQuestionProps) => void;
  title?: string;
  children?: any;
  quesId?: string;
};

export const EditQuestion = (props: CreateQuestionProps) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [children, setChildren]: any = useState(props.children);
  const [successfulSave, setSuccessfulSave] = useState(false);
  const [question, setQuestion] = useState<ddbGetAllQueryResponse | null>(null);
  const [value, setValue] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const author = "AUTHOR#" + searchParams.get('author');
  const quesId = "QUESTION#" + searchParams.get('quesId');
  
  // console.log(`AUTHOR ---- ${author}`)
  // console.log(`QUESID ---- ${quesId}`)
  useEffect(() => {
      const fetchQuestion = async () => {
          const response = await ddbGetQuestionById(author ?? '', quesId ?? '');
          const body = JSON.parse(response.body);
          setQuestion(response);
          setValue(body);
          setTitle(body.title);
          console.log(response);
      }
      if (quesId && author && !title && !value) {
          console.log(`fetching data for author:${author} and quesId ${quesId}`);
          fetchQuestion();
      };
  }, [quesId, title, author, value]);

  useEffect(() => {
    if (props.title) {
      setTitle(props.title);
    }
    if (props.children) {
      setChildren(props.children);
    }
  }, [props.title, props.children, props.quesId]);

  function stringofTags(inputString: string): string[] {
    const cleanedString = inputString.replace(/,/g, ' '); // Replace commas with spaces
    const tagsArray = cleanedString.split(/\s+/); // Split by spaces

    return tagsArray;
  }

  const handleSave = async () => {
    // console.log(JSON.stringify(editorJson, null, 2));
    if (title && children) {
      console.log("onSave called");
      // console.log(`children: ${JSON.stringify(children, null, 2)}`);
      console.log(`onSave called with quesId: ${quesId}`);
      props.onSave({ title, body: children, quesId });
      setSuccessfulSave(true);

      const question = {
        author: author ? author : 'Unknown', // Use the username as author or a default value
        title,
        body: children,
        tags: stringofTags(tags),
      };
      try {
        const response = await ddbCreateQuestion(question); // Make the DynamoDB API call here
        console.log(`Response from DynamoDB: ${JSON.stringify(response)}`);
      } catch (error) {
        console.error('Error saving question to DynamoDB:', error);
      }
    } else {
      console.log("onSave called but title or children are empty");
    }
  };

  const handleChange = (children: any) => {
    // console.log(`children: ${JSON.stringify(children, null, 2)}`);
    setChildren(children);
  };

  console.log("Rendering PostEditor");

  return (
    <div className="flex flex-col justify-center w-screen 2xl:-mt-32">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-center items-center w-full">
          <label className="text-4xl text-orange-500 font-bold mb-2 border-b-2 border-orange-500 items-center justify-center" htmlFor="title">Question:</label>
          <br />
          <input
            className="border-b-2 border-orange-500 py-1"
            type="text"
            id="title"
            value={question ? question.title : ''}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          ></input>

        </div>
        <div className="flex flex-row justify-center items-center w-full my-8">
          <label className="text-4xl text-orange-500 font-bold mb-2 border-b-2 border-orange-500 items-center justify-center" htmlFor="title">Tags:</label>
          <input
            className="border-b-2 border-orange-500 py-1"
            type="text"
            id="tags"
            value={question ? question.tags : ''}
            onChange={(event) => {
              setTags(event.target.value);
            }}
          ></input>
        </div>
      </div>
      <Editor
        // readOnly={props.readOnly}
        onChange={handleChange}
        children={children}
      />
      {successfulSave && <span>Successfully saved</span>}
      <button className="text-white bg-orange-500 h-20 p-2 text-lg rounded-md" onClick={handleSave}>Save</button>
    </div>
  );
};
