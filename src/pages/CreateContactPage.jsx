import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import { addContact } from '../app/contactsSlice';

const CreateContactPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateSubmit = (formData) => {
    const finalData = {
      ...formData,
      createdDate: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
    };
    dispatch(addContact(finalData));
    navigate('/contacts');
  };

  return (
    <div className="page-wrapper">
      <h2>Create Contact</h2>
      <ContactForm onFormSubmit={handleCreateSubmit} buttonText="Create Contact" />
    </div>
  );
};

export default CreateContactPage;