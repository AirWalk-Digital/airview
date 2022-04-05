import { useSelector, useDispatch } from "react-redux";
import { persistEdits } from "../editor-context";

export function MarkdownEditor({ fileName }) {
  const { status, editsData } = useSelector((state) => state.editorContext);

  const dispatch = useDispatch();

  const handleOnChange = (event) => {
    dispatch(
      persistEdits({ path: "_index.content", value: event.target.value })
    );
  };

  const markdownContent = editsData?.[fileName].content ?? "";

  if (status !== "fulfilled") return null;

  return (
    <textarea
      value={markdownContent}
      onChange={handleOnChange}
      style={{ width: "100%", minHeight: 300 }}
    />
  );
}
