import React from 'react';

const baseComponent = (wrappedComponent) => (props) =>{
  return (
    <div>
      <wrappedComponent/> 
    </div>
  )
};

const Button = () => {
  return (
    <button> Click Button </button>
  )
}

const enhance = baseComponent(Button);


  
export default enhance;