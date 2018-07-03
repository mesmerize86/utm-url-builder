import React from 'react';

const TextField = ({ label, field, type, value, placeholder, handleChange}) => {
  return (
    <div className="form-group">
      <label className="form-label ">{label}</label>
      <input 
        type = { type || 'text'} 
        name = { field } 
        value = { value } 
        placeholder = { placeholder }
        onChange = { handleChange }
        className="form-control" />
    </div>
  );
};

export default TextField;