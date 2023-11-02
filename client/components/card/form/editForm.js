import Form from "./addressForm";
import styles from '../card.module.scss';

export default function EditForm({ address, editState, handleEditSubmit }) {

  return (
    <div
    className={`border-2 border-purple p-8 mt-8 w-full md:w-1/2 ${
      editState ? styles['card__edit--visible'] : styles['card__edit']
    }`}
    >
      <Form address={address} onSubmit={handleEditSubmit} />
    </div>
  )
}