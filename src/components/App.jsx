import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

const KEY = '40538294-532b9d41dacfc837c400cb4b1';
const pageLimit = 12;
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page) => {
  const { data } = await axios({
    params: {
      key: KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: pageLimit,
      page: page,
    },
  });
  return data;
};

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    loading: false,
    showModal: false,
    showLoader: false,
    largeImageURL: null,
    tags: '',
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

  closeModal = () => {
    this.setState({ showModal: false });
  };

  openModal = (largeImageURL, tags) => {
    this.setState({ showModal: true, largeImageURL, tags });
  };

  hadleSearchFormSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };
  loadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, largeImageURL, showModal, theEndOfImages, showLoader } =
      this.state;
    const showLoadMoreBtn = images.length > 0 && !theEndOfImages;
    return (
      <div className={css.app}>
        <Searchbar onSubmitForm={this.hadleSearchFormSubmit} />
        <ImageGallery images={images} onModalClick={this.openModal} />
        {showModal && (
          <Modal largeImageURL={largeImageURL} onCloseModal={this.closeModal} />
        )}
        {showLoadMoreBtn && <Button onLoadMoreClick={this.loadMoreClick} />}
        {showLoader && <Loader />}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
