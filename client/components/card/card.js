import React, { useState } from 'react';
import styles from './card.module.scss';
import Button from '../button/button';
import DeleteConfirmationModal from './confirmDelete';
import { toast } from 'react-toastify';
import AddForm from './form/addForm';
import { deleteAddress, updateAddress } from '../../api/addressAPI';
import EditForm from './form/editForm';

export default function Card({
  children,
  editState,
  addState,
  onToggleEdit,
  address,
  getAllAddresses
}) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteAddress(address.id);
      getAllAddresses();
      toast.success('Address deleted successfully');
    } catch (error) {
      toast.error('Error deleting Address');
    }
  };

  const handleEditSubmit = async (values) => {
    try {
      const updatedValues = {
        id: address.id, 
        ...values,
      };
      await updateAddress(address?.id, updatedValues);
      getAllAddresses();
      toast.success('Address updated successfully');
      onToggleEdit();
    } catch (error) {
      toast.error('Error updating Address');
    }
  };

  return (
    <div className={styles.card}>
      <div className={`flex flex-wrap justify-between items-center`}>
        <div className="mb-4 md:mb-0">
          {children}
        </div>
        <div>
          {addState ? (
            <Button variant="secondary" onClick={() => setAddModalOpen(true)}>Add Address</Button>
          ) : (
            <>
              <Button variant="secondary" onClick={onToggleEdit}>
                {editState ? 'Cancel' : 'Edit'}
              </Button>
              <Button variant="error" onClick={() => setDeleteModalOpen(true)}>
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
      <EditForm address={address} handleEditSubmit={handleEditSubmit} editState={editState} />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          setDeleteModalOpen(false);
          handleDelete();
        }}
      />  
      <AddForm onRequestClose={() => setAddModalOpen(false)} addModalOpen={addModalOpen} />
    </div>
  );
}
