import React from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, onImageClick }) => (
  <ul className={css.ImageGallery}>
    {images.map(({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={`${id}-${webformatURL}`}
        smallImageURL={webformatURL}
        onClick={() => onImageClick(largeImageURL)}
      />
    ))}
  </ul>
);
