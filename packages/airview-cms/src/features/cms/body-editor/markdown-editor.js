import React from "react";
import ReactMarkdown from "react-markdown";
import {
  //useDispatch,
  useSelector,
} from "react-redux";
import { selectBodyEditorData } from "./body-editor.slice";

export function MarkdownEditor() {
  //const dispatch = useDispatch();
  const markdownContent = useSelector(selectBodyEditorData);

  return <ReactMarkdown>{markdownContent}</ReactMarkdown>;
}
