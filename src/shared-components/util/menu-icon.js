import React from 'react';

const menuIcon = ({ open, handleToggle }) => (
  <div className={ open ? 'menuIcon open' : 'menuIcon close'} onClick={ handleToggle }>
    <div className="menuIcon-bar1"></div>
    <div className="menuIcon-bar2"></div>
    <div className="menuIcon-bar3"></div>
  </div>
);

export default menuIcon;
