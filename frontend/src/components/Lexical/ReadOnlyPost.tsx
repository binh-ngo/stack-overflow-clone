// import { useEffect } from "react";
// import Editor from "../lexical/Editor";
import ReadOnlyEditor from "./ReadOnlyEditor";

type ReadOnlyPostProps = {
  children: any;
};

const ReadOnlyPost = (props: ReadOnlyPostProps) => {
  // const [title, setTitle] = useState("");
  // const [children, setChildren] = useState([]);

  // useEffect(() => {});
  // console.log("Rendering ReadOnlyPost");

  return (
    <>
      <ReadOnlyEditor children={props.children} />
    </>
  );
};

export default ReadOnlyPost;