import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ContactForm from '../components/ContactForm';
import { updateContact } from '../app/contactsSlice';

const EditContactPage = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const contactToEdit = useSelector(state =>
    state.contacts.data.find(contact => contact.id.toString() === contactId)
  );

  const handleUpdateSubmit = (formData) => {
    const updatedData = { ...contactToEdit, ...formData };
    dispatch(updateContact(updatedData));
    navigate('/contacts');
  };

  if (!contactToEdit) {
    return (
      <div className="page-container">
        <h2>Contact not found</h2>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <h2>Edit Contact</h2>
      <ContactForm
        initialData={contactToEdit}
        onFormSubmit={handleUpdateSubmit}
        buttonText="Update Contact"
      />
    </div>
  );
};

export default EditContactPage;