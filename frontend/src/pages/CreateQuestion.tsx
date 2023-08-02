import { useEffect } from "react";
import { useState } from "react";
import { ddbCreateQuestion, SaveQuestionProps } from "../graphql";
import Editor from "../components/Lexical/Editor.js";
import { Auth } from "aws-amplify";
import "../components/Lexical/styles.css"

type CreateQuestionProps = {
  // onSave: (title: string, content: string) => void;
  onSave: (question: SaveQuestionProps) => void;
  title?: string;
  children?: any;
  quesId?: string;
};

export const CreateQuestion = (props: CreateQuestionProps) => {
  const [quesId, setQuesId] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [children, setChildren]: any = useState(props.children);
  const [successfulSave, setSuccessfulSave] = useState(false);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setAuthor(currentUser.username);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, []);

  useEffect(() => {
    if (props.title) {
      setTitle(props.title);
    }
    if (props.children) {
      setChildren(props.children);
    }
    if (props.quesId) {
      setQuesId(props.quesId);
    }
  }, [props.title, props.children, props.quesId]);

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
        tags: [tags],
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
          value={title}
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
          value={tags}
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
