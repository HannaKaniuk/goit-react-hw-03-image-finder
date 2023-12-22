import React from 'react';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ smallImageURL, onClick }) => (
  <li className={css.ImageGalleryItem}>
    <img
      className={css.ImageGalleryItem_image}
      src={smallImageURL}
      alt=""
      onClick={onClick}
    />
  </li>
);
