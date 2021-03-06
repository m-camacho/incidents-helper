import "./App.scss";

import moment from "moment";
import React, { useContext } from "react";

import { AppContext } from "./AppContextProvider";
import AppHeader from "./AppHeader";
import { DISCONNECTION_TYPE } from "./constants";

const App = () => {
  const { incidents, totals } = useContext(AppContext);

  const tryingToReconnectTotal = totals[DISCONNECTION_TYPE.TRYING_TO_RECONNECT];
  const remoteSessionEndedTotal =
    totals[DISCONNECTION_TYPE.REMOTE_DESKTOP_SESSION_HAS_ENDED];

  return (
    <div className="app-container">
      <AppHeader />
      <div className="app-body">
        <div>{moment().format("YYYY MM DD - dddd")}</div>
        {incidents.length === 0
          ? "There is no registered incidents yet"
          : incidents.map((incident, index) => (
              <div key={index}>
                {moment(incident.when).format("HH:mm")} - {incident.type} -{" "}
                {incident.label}
              </div>
            ))}
        {incidents.length > 0 && (
          <div className="totals-container">
            <div>Totals:</div>
            <div>Incidents: {incidents.length}</div>
            <div>
              {DISCONNECTION_TYPE.TRYING_TO_RECONNECT}: {tryingToReconnectTotal}
              . That means {tryingToReconnectTotal} minutes not working.
            </div>
            <div>
              {DISCONNECTION_TYPE.REMOTE_DESKTOP_SESSION_HAS_ENDED}:{" "}
              {remoteSessionEndedTotal}. That means{" "}
              {remoteSessionEndedTotal * 2} minutes not working.
            </div>
            <div>
              Total amount of time not working due to connectivity issues:{" "}
              {tryingToReconnectTotal + remoteSessionEndedTotal * 2} minutes
              approximately.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
