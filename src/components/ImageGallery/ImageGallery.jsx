import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, onModalClick }) => {
  return (
    <ul className={css.imageGallery}>
      {Array.isArray(images) &&
        images.map(({ id, tags, webformatURL, largeImageURL }, index) => (
          <ImageGalleryItem
            key={`${id}_${index}`}
            id={id}
            tags={tags}
            largeImageURL={largeImageURL}
            webformatURL={webformatURL}
            onModalClick={onModalClick}
          />
        ))}
    </ul>
  );
};
