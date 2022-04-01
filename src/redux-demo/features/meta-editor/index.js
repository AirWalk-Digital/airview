import { useSelector, useDispatch } from "react-redux";
import { persistEdits } from "../entry";

export function MetaEditor() {
  const dispatch = useDispatch();
  const { status, editsData } = useSelector((state) => state.entry);

  const handleOnChange = (event) => {
    dispatch(
      persistEdits({
        path: `_index.data[${event.target.name}]`,
        value: event.target.value,
      })
    );
  };

  if (status !== "succeeded") return null;

  const value = editsData._index.data.title ?? "";

  return (
    <div>
      <h3>Meta editor</h3>
      <hr />
      <label>
        <span>Title</span>
        <input
          type="text"
          value={value}
          onChange={handleOnChange}
          name="title"
          style={{ width: "90%", height: 32, display: "block" }}
        />
      </label>
    </div>
  );
}
