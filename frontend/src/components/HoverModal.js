import React, { useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

const HoverModal = ({
  showModal,
  handleClose,
  handleShow,
  modalHeader,
  modalData,
}) => {
  console.log("shoemodal", showModal);
  const [show, setShow] = useState(showModal);

  return (
    <HoverModalComp>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="modalwidth"
        // className="modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {modalHeader}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="user-block-modal">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoBmbGrzGWJD45wxc2hXS1g8sf2d8MwP3ddw&usqp=CAU"
              alt="User image"
              className="user-modal-image"
            />
            <h4 className="user-name-modal">username</h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </HoverModalComp>
  );
};

const HoverModalComp = styled.div``;

export default HoverModal;
