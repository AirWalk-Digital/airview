import { useState, useLayoutEffect } from "react";
import { Router } from "react-router-dom";

export function AirviewRouter({ history, ...props }) {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => {
    const unlisten = history.listen(setState);

    return () => unlisten();
  }, [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
}
