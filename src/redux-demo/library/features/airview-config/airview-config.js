import React, { useMemo, useContext } from "react";

const ConfigContext = React.createContext();
ConfigContext.displayName = "ConfigContext";

export function ConfigProvider({ children, config }) {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
}

export function useConfig() {
  const config = useContext(ConfigContext);

  return useMemo(() => {
    return { ...config };
  }, [config]);
}
