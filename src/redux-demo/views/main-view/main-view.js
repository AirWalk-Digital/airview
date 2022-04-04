import { useGetContext } from "../../features/context";
import { MarkdownEditor } from "../../features/markdown-editor";
import { EditorToolbar } from "../../features/editor-toolbar";
import { MetaEditor } from "../../features/meta-editor";

export function MainView() {
  const entry = useGetContext("application/ms_teams");

  if (entry.status !== "succeeded") return null;

  return (
    <div
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: 16 }}
    >
      <EditorToolbar />

      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 16, flex: "1 1 50%" }}>
          <h1>{entry.data._index.data.title}</h1>
          <MarkdownEditor fileName="_index" />
        </div>
        <div style={{ flex: "1 1 50%", paddingTop: 20 }}>
          <MetaEditor />
        </div>
      </div>
    </div>
  );
}
