import "./App.scss";

import moment from "moment";
import React, { useContext } from "react";

import { AppContext } from "./AppContextProvider";
import AppHeader from "./AppHeader";

const App = () => {
  const { incidents } = useContext(AppContext);

  return (
    <div className="app-container">
      <AppHeader />
      <div className="app-body">
        <div>{moment().format("YYYY MM DD - dddd")}</div>
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
