import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEntriesMeta } from "./all-entries-meta-slice";

const isEmpty = require("lodash/isEmpty");

export function AllEntriesMeta() {
  const dispatch = useDispatch();
  const allEntriesMetaState = useSelector((state) => state.allEntriesMetaSlice);

  useEffect(() => {
    dispatch(fetchAllEntriesMeta());
  }, [dispatch]);

  if (
    allEntriesMetaState.status === "idle" ||
    (allEntriesMetaState.status === "loading" &&
      isEmpty(allEntriesMetaState.entities))
  ) {
    return (
      <div>
        <p>Loading all entries meta...</p>
      </div>
    );
  }

  if (allEntriesMetaState.status === "error") {
    return <pre>{JSON.stringify(allEntriesMetaState.error, null, 2)}</pre>;
  }

  if (isEmpty(allEntriesMetaState.entities)) {
    return (
      <div>
        <p>No entries</p>
      </div>
    );
  }

  return (
    <div
      style={{ opacity: allEntriesMetaState.status === "loading" ? 0.5 : 1 }}
    >
      <pre>{JSON.stringify(allEntriesMetaState.entities, null, 2)}</pre>
    </div>
  );
}
