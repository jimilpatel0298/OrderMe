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
          <Modal.Title>{props.modalInfo.messages.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span style={{fontWeight: '300'}}>{props.modalInfo.messages.body}</span>
        </Modal.Body>
        <Modal.Footer className='confirmation-modal-footer'>
          <Button variant="secondary" style={{padding: '8px 40px', margin: '0'}} onClick={props.handleClose}>
            No
          </Button>
          <Button variant="primary" style={{padding: '8px 40px', margin: '0', borderBottomRightRadius: '13px'}} onClick={(event) => props.modalInfo.messages.button(event, props.modalInfo)}>Yes</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default Confirmation
