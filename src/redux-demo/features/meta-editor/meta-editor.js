import { useSelector, useDispatch } from "react-redux";
import { persistEdits } from "../context";

export function MetaEditor() {
  const dispatch = useDispatch();
  const { status, editsData } = useSelector((state) => state.context);

  const handleOnChange = (event) => {
    dispatch(
      persistEdits({
        path: `_index.data[${event.target.name}]`,
        value: event.target.value,
      })
    );
  };

  if (status !== "fulfilled") return null;

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
          style={{
            width: "100%",
            height: 32,
            display: "block",
            margin: 0,
            padding: 0,
          }}
        />
      </label>
    </div>
  );
}
