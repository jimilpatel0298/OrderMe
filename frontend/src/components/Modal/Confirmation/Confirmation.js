import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const Confirmation = (props) => {
    return (
        <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.modalInfo.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.modalInfo.body}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={(event) => props.modalInfo.button(event, props.modalInfo)}>Yes</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default Confirmation
