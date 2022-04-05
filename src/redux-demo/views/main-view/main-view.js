import { useGetContext } from "../../features/context";
import { MarkdownEditor } from "../../features/markdown-editor";
import { EditorToolbar } from "../../features/editor-toolbar";
import { MetaEditor } from "../../features/meta-editor";
import {
  useGetAllEntriesMeta,
  useGetEntryMeta,
  useGetEntriesMetaByCollection,
  useGetChildEntriesMeta,
  useGetSiblingEntriesMeta,
} from "../../features/entry-meta";

export function MainView() {
  const entry = useGetContext("application/ms_teams");

  // const allEntryMeta = useGetAllEntriesMeta();
  // const singleEntryMeta = useGetEntryMeta("application/ms_teams");
  // const collectionEntries = useGetEntriesMetaByCollection("knowledge");
  // const childEntriesMeta = useGetChildEntriesMeta("application/ms_teams");
  // const siblingEntriesMeta = useGetSiblingEntriesMeta(
  //   "knowledge/composing_a_new_message"
  // );

  // console.log("allEntryMeta", allEntryMeta);
  // console.log("singleEntryMeta", singleEntryMeta);
  // console.log("collectionEntries", collectionEntries);
  // console.log("childEntriesMeta", childEntriesMeta);
  // console.log("siblingEntriesMeta", siblingEntriesMeta);

  if (entry.status !== "fulfilled") return null;

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
