import React from 'react';
import Modal from 'react-modal';
import styles from '../card.module.scss';
import AddressForm from './addressForm';

export default function AddForm({ 
  onRequestClose, 
  addModalOpen, 
  handleAddAddress 
}) {
  return (
    <Modal isOpen={addModalOpen} onRequestClose={onRequestClose} className={styles.addModal}>
      <h2 style={{textAlign: 'center'}}>Add Address</h2>
      <AddressForm
        onSubmit={handleAddAddress}
      />
    </Modal>
  );
}
