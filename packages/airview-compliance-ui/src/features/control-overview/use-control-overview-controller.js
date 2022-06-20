/* eslint react-hooks/exhaustive-deps: 0 */
import { useEffect, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "INITIALIZE": {
      return {
        groups: action.payload,
        controls: undefined,
        resources: undefined,
      };
    }
    case "SET_CONTROLS_DATA": {
      return {
        ...state,
        controls: {
          ...state?.controls,
          [action.id]: action.payload,
        },
      };
    }
    case "SET_RESOURCES_DATA": {
      return {
        ...state,
        resources: {
          ...state?.resources,
          [action.id]: action.payload,
        },
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function useControlOverviewController(getInitalData, applicationId) {
  const [state, dispatch] = useReducer(reducer);

  useEffect(() => {
    if (applicationId === undefined) return;
    initializeData();
  }, [applicationId]);

  async function initializeData() {
    dispatch({ type: "INITIALIZE", payload: "loading" });

    try {
      const data = await getInitalData();
      dispatch({ type: "INITIALIZE", payload: data });
    } catch {
      dispatch({ type: "INITIALIZE" });
    }
  }

  async function setControlsData(id, getData) {
    const groupDataValue = state?.controls?.[id];

    if (
      groupDataValue !== "loading" &&
      (groupDataValue === undefined || groupDataValue === "error")
    ) {
      dispatch({ type: "SET_CONTROLS_DATA", id, payload: "loading" });

      const data = await getData();
      dispatch({ type: "SET_CONTROLS_DATA", id, payload: data });
    }
  }

  async function setResourcesData(id, getData) {
    const resourcesDataValue = state?.resources?.[id];

    if (
      resourcesDataValue !== "loading" &&
      (resourcesDataValue === undefined || resourcesDataValue === "error")
    ) {
      dispatch({ type: "SET_RESOURCES_DATA", id, payload: "loading" });

      const data = await getData();
      dispatch({ type: "SET_RESOURCES_DATA", id, payload: data });
    }
  }

  return [state, setControlsData, setResourcesData, initializeData];
}

export { useControlOverviewController };
