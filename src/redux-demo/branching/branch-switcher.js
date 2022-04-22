import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranches, setWorkingBranch } from "./branches-slice";
import { fetchAllEntriesMeta } from "../all-entries-meta";

export function BranchSwitcher() {
  const dispatch = useDispatch();
  const branchesState = useSelector((state) => state.branchesSlice);
  const allEntriesMetaState = useSelector((state) => state.allEntriesMetaSlice);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const handleOnChange = (event) => {
    event.preventDefault();
    dispatch(setWorkingBranch(event.currentTarget.value));
    dispatch(fetchAllEntriesMeta());
  };

  if (
    branchesState.status === "idle" ||
    (branchesState.status === "loading" && !branchesState.branches)
  ) {
    return <p>Loading branches...</p>;
  }

  if (branchesState.status === "error") {
    return <pre>{JSON.stringify(branchesState.error, null, 2)}</pre>;
  }

  return (
    <div>
      <select
        onChange={handleOnChange}
        value={branchesState.workingBranch}
        disabled={
          branchesState.status === "loading" ||
          allEntriesMetaState.status === "loading"
        }
      >
        {branchesState.branches.map((branch) => {
          return (
            <option key={branch.sha} name={branch.name}>
              {branch.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
