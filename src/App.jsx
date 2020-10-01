import "./App.scss";

import moment from "moment";
import React, { useContext } from "react";
import { Button } from "react-bootstrap";

import { AppContext } from "./AppContextProvider";

const VM_DISCONNECTION = "VM Disconnection";
const TRYING_TO_RECONNECT = "Trying to reconnect";
const REMOTE_DESKTOP_SESSION_HAS_ENDED =
  "Your Remote Desktop Services session has ended";

const App = () => {
  const { incidents, addIncident } = useContext(AppContext);

  return (
    <div className="app-container">
      <div className="app-header">
        Report Incident
        <Button
          variant="info"
          onClick={() => {
            addIncident({
              when: new Date(),
              label: `${VM_DISCONNECTION} - ${TRYING_TO_RECONNECT}`,
            });
          }}
        >
          {TRYING_TO_RECONNECT}
        </Button>
        <Button
          variant="info"
          onClick={() => {
            addIncident({
              when: new Date(),
              label: `${VM_DISCONNECTION} - ${REMOTE_DESKTOP_SESSION_HAS_ENDED}`,
            });
          }}
        >
          {REMOTE_DESKTOP_SESSION_HAS_ENDED}
        </Button>
      </div>
      <div className="app-body">
        <div>{moment().format("YYYY MM DD ")}</div>
        {incidents.length === 0
          ? "There is no registered incidents yet"
          : incidents.map((incident, index) => (
              <div key={index}>
                {moment(incident.when).format("HH:mm")} - {incident.label}
              </div>
            ))}
      </div>
    </div>
  );
};

export default App;
