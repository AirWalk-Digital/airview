import { useSetEditorContext, MarkdownEditor } from "../../library";
import { ChildEntriesMeta } from "./child-entries-meta";
import { SiblingEntriesMeta } from "./sibling-entries-meta";

export function MainView() {
  const entryId = "application/ms_teams";
  const entry = useSetEditorContext(entryId);

  console.log(entry);

  if (entry.status !== "fulfilled") return <div>Loading...</div>;

  return (
    <div>
      <h1>{entry.data._index.data.title}</h1>
      <MarkdownEditor fileName="_index" />
      <hr />
      <ChildEntriesMeta entryId={entryId} />
      <hr />
      <SiblingEntriesMeta entryId={entryId} />
    </div>
  );
}
