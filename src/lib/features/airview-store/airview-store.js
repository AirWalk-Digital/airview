import React, { useReducer, useContext, useMemo, useCallback } from "react";

const actionTypes = {
  ENABLE_EDIT_MODE: "enable_edit_mode",
  DISABLE_EDIT_MODE: "disable_edit_mode",
  TOGGLE_EDIT_MODE: "toggle_edit_mode",
  SET_EDITOR_CONTEXT: "set_editor_context",
  CLEAR_EDITOR_CONTEXT: "clear_editor_context",
};

function createAction(type, payload) {
  return {
    type,
    payload,
  };
}

export const actions = {
  setEditorContext: (entryId) => {
    return createAction(actionTypes.SET_EDITOR_CONTEXT, entryId);
  },
};

const initialState = {
  editMode: false,
  edits: null,
  workingBranch: "main",
  context: null,
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.ENABLE_EDIT_MODE:
      return { ...state, editMode: true };
    case actionTypes.DISABLE_EDIT_MODE:
      return { ...state, editMode: false };
    case actionTypes.TOGGLE_EDIT_MODE:
      return { ...state, editMode: !state.editMode };
    case actionTypes.SET_EDITOR_CONTEXT:
      return { ...state, context: action.payload };
    case actionTypes.CLEAR_EDITOR_CONTEXT:
      return { ...state, context: null };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

const AirviewStoreContext = React.createContext();
AirviewStoreContext.displayName = "AirviewStoreContext";

export function AirviewStoreProvider({ children }) {
  const value = useReducer(reducer, initialState);

  return (
    <AirviewStoreContext.Provider value={value}>
      {children}
    </AirviewStoreContext.Provider>
  );
}

export function useAirviewStoreState() {
  const [state] = useContext(AirviewStoreContext);

  return state;
}

export function useSetAirviewStoreContext() {
  const [, dispatch] = useContext(AirviewStoreContext);

  return useCallback(
    (entryId) => dispatch(actions.setEditorContext(entryId)),
    [dispatch]
  );
}

export function useGetAirviewStoreContext() {
  const [state] = useContext(AirviewStoreContext);

  return useMemo(() => state.context, [state.context]);
}
