import { useParams } from "react-router-dom";
import { useSetEditorContext, MarkdownEditor } from "../../../library";
import { ChildEntriesMeta } from "./child-entries-meta";
import { SiblingEntriesMeta } from "./sibling-entries-meta";

export function EntryView() {
  const { collection = "", entry = "" } = useParams();

  const entryId = !collection || !entry ? "" : `${collection}/${entry}`;

  const { data, status } = useSetEditorContext(entryId);

  if (status !== "fulfilled") return <div>Loading entry...</div>;

  return (
    <div>
      <h1>{data._index.data.title}</h1>
      <MarkdownEditor fileName="_index" />
      <hr />
      <ChildEntriesMeta entryId={entryId} />
      <hr />
      <SiblingEntriesMeta entryId={entryId} />
    </div>
  );
}
