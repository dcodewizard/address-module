import React from 'react';
import Modal from 'react-modal';
import { addAddress, getAddresses } from '../../../api/addressAPI';
import { toast } from 'react-toastify';
import styles from '../card.module.scss';
import AddressForm from './addressForm';

export default function AddForm({ onRequestClose, addModalOpen }) {

  const handleAddAddress = async (values) => {
    try {
      await addAddress(values);
      getAddresses();
      onRequestClose();
      toast.success('Address Added successfully');
    } catch (error) {
      toast.error('Error Adding Address');
    }
  };
  return (
    <Modal isOpen={addModalOpen} onRequestClose={onRequestClose} className={styles.addModal}>
      <h2 style={{textAlign: 'center'}}>Add Address</h2>
      <AddressForm
        onSubmit={handleAddAddress}
      />
    </Modal>
  );
}
