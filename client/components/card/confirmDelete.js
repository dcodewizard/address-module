import React from 'react';
import Modal from 'react-modal';
import Button from '../button/button';

Modal.setAppElement('#__next');

function DeleteConfirmationModal({ isOpen, onRequestClose, onConfirm }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
    >
      <div className="content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this address?</p>
        <div className="buttons">
          <Button
            onClick={onConfirm}
            variant="error"
          >
            Confirm
          </Button>
          <Button
            onClick={onRequestClose}
            variant="secondary"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );

}

export default DeleteConfirmationModal;