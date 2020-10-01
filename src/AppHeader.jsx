import "./AppHeader.scss";

import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { AppContext } from "./AppContextProvider";

const VM_DISCONNECTION = "VM Disconnection";
const TRYING_TO_RECONNECT = "Trying to reconnect";
const REMOTE_DESKTOP_SESSION_HAS_ENDED =
  "Your Remote Desktop Services session has ended";

const AppHeader = () => {
  const { addIncident } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  return (
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
