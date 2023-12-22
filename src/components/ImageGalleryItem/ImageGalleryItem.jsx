import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({
  id,
  tags,
  webformatURL,
  largeImageURL,
  onModalClick,
}) => {
  return (
    <li key={id} className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItem_image}
        src={webformatURL}
        alt={tags}
        onClick={() => onModalClick(largeImageURL, tags)}
      />
    </li>
  );
};
