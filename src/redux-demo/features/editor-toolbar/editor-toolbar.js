import { useSelector, useDispatch } from "react-redux";
import { clearEdits } from "../context";
const isEqual = require("lodash/isEqual");

export function EditorToolbar() {
  const dispatch = useDispatch();
  const { originalData, editsData } = useSelector((store) => store.context);

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
    </div>
  );
}
