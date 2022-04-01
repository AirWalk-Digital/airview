import { useGetEntry } from "../../features/entry";
import { MarkdownEditor } from "../../features/markdown-editor";
import { EditorToolbar } from "../../features/editor-toolbar";
import { MetaEditor } from "../../features/meta-editor";

export function MainView() {
  const entry = useGetEntry("application/ms_teams");

  console.log(entry);

  if (entry.status !== "succeeded") return null;

  return (
    <>
      <EditorToolbar />

      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 16, flex: "1 0 800px" }}>
          <h1>{entry.data._index.data.title}</h1>
          <MarkdownEditor fileName="_index" />
        </div>
        <div style={{ flex: "1 1 100%", paddingTop: 20 }}>
          <MetaEditor />
        </div>
      </div>
    </>
  );
}
