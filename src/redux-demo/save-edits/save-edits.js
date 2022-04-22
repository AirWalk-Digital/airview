import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBranches } from "../branching";
import { fetchAllEntriesMeta } from "../all-entries-meta";

export function SaveEdits() {
  const [saved, setSaved] = useState(false);
  const dispatch = useDispatch();
  const branchesSliceState = useSelector((state) => state.branchesSlice);
  const allEntriesMetaState = useSelector((state) => state.allEntriesMetaSlice);

  const disabled =
    saved ||
    branchesSliceState.status === "loading" ||
    allEntriesMetaState.status === "loading";

  const saveEdits = () => {
    setSaved(true);
    dispatch(fetchBranches());
    dispatch(fetchAllEntriesMeta());
  };

  return (
    <div>
      <button onClick={saveEdits} disabled={disabled}>
        Save edits
      </button>
    </div>
  );
}
