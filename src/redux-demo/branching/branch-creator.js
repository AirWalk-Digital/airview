import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBranches,
  setWorkingBranch,
  branchesData,
} from "./branches-slice";
import { fetchAllEntriesMeta } from "../all-entries-meta";

export function BranchCreator() {
  const allEntriesMetaState = useSelector((state) => state.allEntriesMetaSlice);
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const newBranchName = "three";

  const createBranch = async () => {
    setClicked(true);
    branchesData.push({ name: newBranchName, sha: "hjk", isProtected: false });

    await dispatch(fetchBranches()).unwrap();

    dispatch(setWorkingBranch(newBranchName));

    dispatch(fetchAllEntriesMeta());
  };

  return (
    <div>
      <button
        onClick={createBranch}
        disabled={clicked || allEntriesMetaState.status === "loading"}
      >
        Create Branch
      </button>
    </div>
  );
}
