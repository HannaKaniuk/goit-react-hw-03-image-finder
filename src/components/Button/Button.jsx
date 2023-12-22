import React from 'react';
import css from './Button.module.css';
export const Button = ({ isVisible = true, onClick }) => {
  return isVisible ? (
    <button className={css.Button} type="button" onClick={onClick}>
      Load more
    </button>
  ) : null;
};
