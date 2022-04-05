import { EditorToolbar } from "./editor-toolbar";
import { MetaEditor } from "./meta-editor";

export function EditorUi({ children }) {
  return (
    <div
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: 16 }}
    >
      <EditorToolbar />

      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 16, flex: "1 1 50%" }}>{children}</div>
        <div style={{ flex: "1 1 50%", paddingTop: 20 }}>
          <MetaEditor />
        </div>
      </div>
    </div>
  );
}
