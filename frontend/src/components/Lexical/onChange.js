import { $getRoot, $getSelection } from "lexical";

// This can be changed to a different function for troubleshooting.

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
export default function onChange(editorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    console.log(root, selection);
  });

  // const editorState = editor.getEditorState();
  const json = editorState.toJSON();
  console.log(`json: ${JSON.stringify(json, null, 2)}`);
}