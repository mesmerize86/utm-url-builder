import React from 'react';

const TextField = ({ label, field, type, value, placeholder, length, handleChange, handleKeyPress}) => {
  return (
    <div className="form-group">
      <label className="form-label ">{label}</label>
      <input 
        type = { type || 'text'} 
        name = { field } 
        value = { value } 
        maxLength = { length }
        placeholder = { placeholder }
        onKeyPress = {handleKeyPress}
        onChange = { handleChange }
        className="form-control" />
    </div>
  );
};

export default TextField;