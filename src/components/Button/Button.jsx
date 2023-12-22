import css from './Button.module.css';
export const Button = ({ onLoadMoreClick }) => {
  return (
    <button className={css.button} type="button" onClick={onLoadMoreClick}>
      Load more
    </button>
  );
};
