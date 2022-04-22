import { useSelector, useDispatch } from "react-redux";
import {
  selectWorkingBranch,
  useGetBranchesQuery,
  setWorkingBranch,
} from "../branching";
import { clearEdits } from "../editor-context";
const isEqual = require("lodash/isEqual");

export function EditorToolbar() {
  const dispatch = useDispatch();
  const { originalData, editsData } = useSelector(
    (store) => store.editorContext
  );

  const haveEdits = !isEqual(originalData, editsData);

  const handleOnClearClick = () => dispatch(clearEdits());

  const handleOnSaveClick = () => console.log("saving, payload:", editsData);

  return (
    <div style={{ marginBottom: 16 }}>
      <button onClick={handleOnClearClick} disabled={!haveEdits}>
        Clear Edits
      </button>
      <button onClick={handleOnSaveClick} disabled={!haveEdits}>
        Save edits
      </button>
      <BranchSwitcher />
    </div>
  );
}

function BranchSwitcher() {
  const dispatch = useDispatch();
  const workingBranch = useSelector(selectWorkingBranch);
  const {
    isLoading,
    isFetching,
    isError,
    data: branches,
  } = useGetBranchesQuery();

  const handleOnChange = (event) => {
    // Block switching if have edits
    dispatch(setWorkingBranch(event.target.value));
  };

  if (isError) return <p>Error fetching branch list</p>;

  if (isLoading) return <p>Fetching branch list...</p>;

  return (
    <select
      value={workingBranch}
      onChange={handleOnChange}
      disabled={isFetching}
    >
      {branches.map(({ name }) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
}
