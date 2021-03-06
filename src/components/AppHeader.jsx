import "./AppHeader.scss";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { AppContext } from "./AppContextProvider";
import { DISCONNECTION_TYPE, INCIDENT_TYPE } from "./constants";

const AppHeader = () => {
  const { addIncident } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const keyDownHandler = useCallback((evt) => {
    if (evt.shiftKey && evt.code === "Digit1") {
      addIncident({
        when: new Date(),
        type: INCIDENT_TYPE.VM_DISCONNECTION,
        label: DISCONNECTION_TYPE.TRYING_TO_RECONNECT,
      });
      return;
    }
    if (evt.shiftKey && evt.code === "Digit2") {
      addIncident({
        when: new Date(),
        type: INCIDENT_TYPE.VM_DISCONNECTION,
        label: DISCONNECTION_TYPE.REMOTE_DESKTOP_SESSION_HAS_ENDED,
      });
    }
    if (evt.shiftKey && evt.code === "Digit3") {
      setShowModal(true);
    }
  });

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);

  const handleClose = () => setShowModal(false);

  return (
    <div className="app-header">
      Report Incident
      <Button
        variant="info"
        onClick={() => {
          addIncident({
            when: new Date(),
            type: INCIDENT_TYPE.VM_DISCONNECTION,
            label: DISCONNECTION_TYPE.TRYING_TO_RECONNECT,
          });
        }}
      >
        {DISCONNECTION_TYPE.TRYING_TO_RECONNECT}
      </Button>
      <Button
        variant="info"
        onClick={() => {
          addIncident({
            when: new Date(),
            type: INCIDENT_TYPE.VM_DISCONNECTION,
            label: DISCONNECTION_TYPE.REMOTE_DESKTOP_SESSION_HAS_ENDED,
          });
        }}
      >
        {DISCONNECTION_TYPE.REMOTE_DESKTOP_SESSION_HAS_ENDED}
      </Button>
      <Button
        variant="info"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Custom Incident
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Report a Custom Incident</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Custom Incident form goes here.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AppHeader;
