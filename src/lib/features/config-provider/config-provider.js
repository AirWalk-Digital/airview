import React from "react";

export const ConfigContext = React.createContext();
ConfigContext.displayName = "ConfigContext";

export function ConfigProvider({ children, config }) {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
}
