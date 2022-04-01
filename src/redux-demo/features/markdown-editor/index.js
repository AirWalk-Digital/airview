import { useSelector, useDispatch } from "react-redux";
import { persistEdits } from "../entry";

export function MarkdownEditor({ fileName }) {
  const { status, editsData } = useSelector((state) => state.entry);

  const dispatch = useDispatch();

  const handleOnChange = (event) => {
    dispatch(
      persistEdits({ path: "_index.content", value: event.target.value })
    );
  };

  const markdownContent = editsData?.[fileName].content ?? "";

  if (status !== "succeeded") return null;

  return (
    <textarea
      value={markdownContent}
      onChange={handleOnChange}
      style={{ width: "100%", maxWidth: 800, minHeight: 300 }}
    />
  );
}
