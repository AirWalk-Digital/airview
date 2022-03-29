import React, { useReducer, useContext } from "react";

const initialState = {
  editMode: false,
  edits: null,
  workingBranch: "main",
  context: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "enable_edit_mode":
      return { ...state, editMode: true };
    case "disable_edit_mode":
      return { ...state, editMode: false };
    case "toggle_edit_mode":
      return { ...state, editMode: !state.editMode };
    case "set_context":
      return { ...state, context: action.payload };
    case "clear_context":
      return { ...state, context: null };
    default:
      throw new Error();
  }
}

const AirviewStoreContext = React.createContext();
AirviewStoreContext.displayName = "AirviewStoreContext";

export function AirviewStoreProvider({ children }) {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <AirviewStoreContext.Provider value={{ store, dispatch }}>
      {children}
    </AirviewStoreContext.Provider>
  );
}

export function useAirviewStore() {
  const [store, dispatch] = useContext(AirviewStoreContext);
}
