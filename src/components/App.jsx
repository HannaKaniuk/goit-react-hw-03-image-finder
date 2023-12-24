import React, { Component } from 'react';
import { fetchImages } from './services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    loading: false,
    showLoader: false,
    modalData: null,
    error: null,
    theEndOfImages: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ showLoader: true });

        const allImages = await fetchImages(query, page);
        if (allImages.length === 0) {
          toast.info('Sorry, there are no images matching your search query.');
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...allImages.hits],
        }));
        const totalPages = Math.ceil(allImages.totalHits / 12);
        if (page === totalPages) {
          this.setState({ theEndOfImages: true });
          toast.info(
            'Sorry, there are no more images matching your search query.'
          );
        }
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ showLoader: false });
      }
    }
  }

  openModal = (largeImageURL, tags) => {
    this.setState({
      modalData: { largeImageURL, tags },
    });
  };
  closeModal = () => {
    this.setState({
      modalData: null,
    });
  };

  hadleSearchFormSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };
  loadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, theEndOfImages, showLoader, modalData } = this.state;
    const showLoadMoreBtn = images.length > 0 && !theEndOfImages;
    return (
      <div className={css.app}>
        <Searchbar onSubmitForm={this.hadleSearchFormSubmit} />
        <ImageGallery images={images} onModalClick={this.openModal} />
        {modalData && (
          <Modal
            largeImageURL={modalData.largeImageURL}
            onCloseModal={this.closeModal}
            tags={modalData.tags}
          />
        )}
        {showLoadMoreBtn && <Button onLoadMoreClick={this.loadMoreClick} />}
        {showLoader && <Loader />}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
