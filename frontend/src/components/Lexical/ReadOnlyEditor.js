import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
// import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
// import { ListPlugin } from "@lexical/react/LexicalListPlugin";
// import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
// import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
// import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import editorConfig from "./editorConfig";
import "./styles.css";

export default function ReadOnlyEditor({ children }) {
  const config = {
    ...editorConfig,
    readOnly: true,
    editorState: (editor) => {
      const editorState = editor.parseEditorState(JSON.stringify(children));
      editor.setEditorState(editorState);
      // console.log(`editorState: ${JSON.stringify(editorState)}`);
    },
  };

  // console.log(
  //   `children in ReadOnlyEditor: ${JSON.stringify(children, null, 2)}`
  // );

  console.log(`Render ReadOnlyEditor`);
  return (
    <>
      <LexicalComposer initialConfig={config}>
        <div className="readonly-editor-container">
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
            />
            {/* <LinkPlugin />
            <ListPlugin />
            <AutoLinkPlugin />
            <CodeHighlightPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} /> */}
          </div>
        </div>
      </LexicalComposer>
    </>
  );
}