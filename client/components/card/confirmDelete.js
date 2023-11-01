import React from 'react';
import Modal from 'react-modal';
import Button from '../button/button';
import styles from './card.module.scss'

Modal.setAppElement('#__next');

function DeleteConfirmationModal({ isOpen, onRequestClose, onConfirm }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
    >
      <div className={styles.content}>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this address?</p>
        <div className={styles.buttons}>
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