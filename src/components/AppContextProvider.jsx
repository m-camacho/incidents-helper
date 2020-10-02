import PropTypes from "prop-types";
import React, { createContext, useState } from "react";

import { DISCONNECTION_TYPE } from "./constants";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [incidents, setIncidents] = useState([]);
  const [totals, setTotals] = useState({});

  const addIncident = (newIncident) => {
    const newIncidents = [...incidents, newIncident];
    const newTotals = {
      [DISCONNECTION_TYPE.TRYING_TO_RECONNECT]: newIncidents.filter(
        (incidentTmp) =>
          incidentTmp.label === DISCONNECTION_TYPE.TRYING_TO_RECONNECT
      ).length,
      [DISCONNECTION_TYPE.REMOTE_DESKTOP_SESSION_HAS_ENDED]: newIncidents.filter(
        (incidentTmp) =>
          incidentTmp.label ===
          DISCONNECTION_TYPE.REMOTE_DESKTOP_SESSION_HAS_ENDED
      ).length,
    };
    setIncidents(newIncidents);
    setTotals(newTotals);
  };

  return (
    <AppContext.Provider
      value={{
        incidents,
        totals,
        addIncident,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

AppContextProvider.defaultProps = {
  children: null,
};

export default AppContextProvider;
