import React, { useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetEntryMeta,
  useSetAirviewStoreContext,
  useConfig,
  MarkdownEditor,
} from "../../../lib";

export function EntryBody() {
  const { collectionId = "", entryId = "" } = useParams();
  const config = useConfig();
  const entry = !collectionId || !entryId ? null : `${collectionId}/${entryId}`;
  const setContext = useSetAirviewStoreContext();
  const { data: entryMeta } = useGetEntryMeta(entry);

  const additionalFiles =
    config.collections[collectionId]?.additionalFiles ?? [];

  useLayoutEffect(() => {
    setContext(entry);
  }, [entry, setContext]);

  return (
    <React.Fragment>
      <h3>Entry data</h3>
      <hr />
      <h4>{entryMeta?.meta.title}</h4>
      <MarkdownEditor file="_index.md" />
      {additionalFiles.map((file) => {
        return (
          <React.Fragment key={file.name}>
            <br />
            <MarkdownEditor file={file.name} />
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}

/*
categories 
*/
