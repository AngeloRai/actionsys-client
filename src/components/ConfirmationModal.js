import { Modal } from "react-bootstrap";

function ConfirmationModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={props.handleClose}>
          Fechar
        </button>
        <button className="btn btn-danger" onClick={props.handleConfirm}>
          Confirmar
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;