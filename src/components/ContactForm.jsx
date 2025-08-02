import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Generic input field component for text, email, date, etc.
const InputField = ({ name, label, register, errors, type = 'text' }) => (
  <div className="input-group">
    <label htmlFor={name}>{label} *</label>
    <input
      id={name}
      type={type}
      className={errors[name] ? 'input-error' : ''}
      {...register(name, { required: `${label} is required` })}
    />
    {errors[name] && <p className="input-error-message">{errors[name].message}</p>}
  </div>
);

// Component for Textarea
const TextareaField = ({ name, label, register, errors }) => (
  <div className="textarea-group">
    <label htmlFor={name}>{label} *</label>
    <textarea
      id={name}
      className={errors[name] ? 'input-error' : ''}
      {...register(name, { required: `${label} is required` })}
    ></textarea>
     {errors[name] && <p className="input-error-message">{errors[name].message}</p>}
  </div>
);

// Component for Select dropdown
const SelectField = ({ name, label, register, errors, options }) => (
  <div className="select-group">
    <label htmlFor={name}>{label} *</label>
    <select
      id={name}
      className={errors[name] ? 'input-error' : ''}
      {...register(name, { required: `${label} is required` })}
    >
      {options.map(option => <option key={option} value={option}>{option}</option>)}
    </select>
    {errors[name] && <p className="input-error-message">{errors[name].message}</p>}
  </div>
);


const ContactForm = ({ initialData, onFormSubmit, buttonText = 'Create' }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: initialData || {},
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="form-container">
      {/* --- NEW: Core Information Section --- */}
      <section className="form-section-card">
        <h3 className="form-section-header">Core Information</h3>
        <div className="form-grid-3-col">
            <InputField name="name" label="Name" register={register} errors={errors} />
            <InputField name="phone" label="Primary Phone" register={register} errors={errors} />
            <InputField name="contactOwner" label="Contact Owner" register={register} errors={errors} />
            <InputField name="accountName" label="Account Name" register={register} errors={errors} />
            <SelectField name="contactSource" label="Contact Source" register={register} errors={errors} options={['Database', 'Web', 'Referral', 'Trade Show']} />
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="form-section-card">
        <h3 className="form-section-header">Contact Details</h3>
        <div className="form-grid-3-col">
          <InputField name="email" label="Email" register={register} errors={errors} type="email" />
          <InputField name="secondaryEmail" label="Secondary Email" register={register} errors={errors} type="email" />
          <InputField name="mobileNo1" label="Mobile No 1" register={register} errors={errors} />
          
          <InputField name="mobileNo2" label="Mobile No 2" register={register} errors={errors} />
          <InputField name="twitter" label="Twitter" register={register} errors={errors} />
          <InputField name="skypeId" label="Skype Id" register={register} errors={errors} />
          
          <InputField name="linkedinBio" label="LinkedIn bio" register={register} errors={errors} />
        </div>
        <div className="form-grid-3-col" style={{marginTop: '1.5rem'}}>
          <TextareaField name="remarks" label="Remarks" register={register} errors={errors} />
          <SelectField name="appointmentStatus" label="Appointment Status" register={register} errors={errors} options={['Yes', 'No']} />
          <InputField name="appointmentDate" label="Appointment Date" register={register} errors={errors} type="date" />
          <InputField name="appointmentTime" label="Appointment Time" register={register} errors={errors} type="time" />
        </div>
      </section>

      {/* Address Section */}
      <section className="form-section-card">
        <h3 className="form-section-header">Address</h3>
        <div className="form-grid-3-col">
            <InputField name="pinCode" label="Pin Code" register={register} errors={errors} />
            <InputField name="country" label="Country" register={register} errors={errors} />
            <InputField name="state" label="State" register={register} errors={errors} />
            <InputField name="city" label="City" register={register} errors={errors} />
        </div>
        <div style={{marginTop: '1.5rem'}}>
            <InputField name="addressLine" label="Address line" register={register} errors={errors} />
        </div>
      </section>

      <div>
        <button type="submit" className="form-submit-button">
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;