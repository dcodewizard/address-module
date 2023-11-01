import React, { useState } from 'react';
import styles from './card.module.scss';
import Button from '../button/button';
import DeleteConfirmationModal from './confirmDelete';
import { toast } from 'react-toastify';
import EditForm from './editForm';

export default function Card({
  children,
  editState,
  addState,
  onToggleEdit,
  address,
  getAllAddresses
}) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteAddress(address.id);
      getAllAddresses();
      toast.success('Address deleted successfully');
    } catch (error) {
      toast.error('Error deleting Address');
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
            <Button variant="secondary">Add Address</Button>
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
      <div
        className={`border-2 border-purple p-8 mt-8 w-full md:w-1/2 ${
          editState ? styles['card__edit--visible'] : styles['card__edit']
        }`}
      >
        <EditForm address={address} getAllAddresses={getAllAddresses} onToggleEdit={onToggleEdit} />
      </div>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          setDeleteModalOpen(false);
          handleDelete();
        }}
      />
    </div>
  );
}
