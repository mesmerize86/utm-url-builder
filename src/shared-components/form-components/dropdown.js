import React from 'react';

const dropdown = ({ options, handleChange }) => {
  return(
    <select className="form-control form-controlSelect" defaultValue="" onChange={ handleChange }>  
      <option value="">Please select options</option>
      { options }
    </select>
  )
}

export default dropdown;