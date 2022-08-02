import React, { useContext } from "react";
import PropTypes from "prop-types";

const LocationContext = React.createContext();

export function LocationProvider({ location, children }) {
  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
}

LocationProvider.propTypes = {
  location: PropTypes.string,
  children: PropTypes.node,
};

export const useLocation = () => useContext(LocationContext);
