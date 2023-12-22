import React, { Component } from 'react';
import axios from 'axios';
import css from './App.module.css';
import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    data: null,
    loading: false,
    error: null,
    selectedImage: null,
    query: '',
    page: 1,
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    try {
      const { query, page } = this.state;
      this.setState({ loading: true });

      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: '40538294-532b9d41dacfc837c400cb4b1',
          per_page: 12,
          page,
          q: query,
        },
      });

      this.setState(prevState => ({
        data: prevState.data
          ? [...prevState.data, ...response.data.hits]
          : response.data.hits,
        loading: false,
        page: page + 1,
      }));
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  handleImageClick = largeImageURL => {
    this.setState({ selectedImage: largeImageURL });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  handleSearch = query => {
    this.setState({ query, page: 1, data: null }, () => {
      this.loadData();
    });
  };

  render() {
    const { data, loading, error, selectedImage } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearch} />
        {loading && <Loader />}
        {error && <p>Error: {error}</p>}
        {data && data.length > 0 && (
          <ImageGallery images={data} onImageClick={this.handleImageClick} />
        )}
        <Button onClick={this.loadData} />
        {selectedImage && (
          <Modal onClose={this.closeModal}>
            <img src={selectedImage} alt="Large" />
          </Modal>
        )}
      </div>
    );
  }
}
