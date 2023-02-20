import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Modal } from 'components/Modal/Modal';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Notification } from 'components/Notification/Notification';

import fetchImages from 'service/pixabay-api';

export class App extends Component {
  state = {
    webformatURL: '',
    largeImageURL: '',
    alt: '',
    page: 1,
    query: '',
    articles: [],
    isLoading: false,
    error: null,
    showModal: false,
    totalHits: 0,
    tags: '',
  };

  async componentDidUpdate(_, prevState) {
    const searchQuery = this.state.query;
    const searchPage = this.state.page;

    if (searchQuery !== prevState.query || searchPage !== prevState.page) {
      try {
        this.setState({ isLoading: true });
        const imageData = await fetchImages(searchQuery, searchPage);

        const imagesHits = imageData.hits;

        if (imagesHits.length === 0) {
          toast.warning('No results were found, please try something else.');
          return;
        }

        this.setState(({ articles }) => ({
          articles: [...articles, ...imagesHits],
          totalHits: imageData.totalHits,
        }));
      } catch (error) {
        this.setState({
          error: new Error(`Sorry something went wrong. ${error.message}`),
        });

        toast.error(`Sorry something went wrong. ${error.message}`);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleFormSubmit = text => {
    this.setState({ query: text.trim(), page: 1, articles: [] });
  };

  handleLoadMore = e => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleImageClick = index => {
    this.toggleModal();
    this.setState({
      largeImageURL: this.state.articles[index].largeImageURL,
      tags: this.state.articles[index].tags,
    });
  };

  render() {
    const { showModal, articles, error, isLoading } = this.state;
    const imagesCount = articles.length;

    return (
      <>
        <>
          <SearchBar onSearchFormSubmit={this.handleFormSubmit} />

          {isLoading && <Loader />}
          {error && (
            <h1 style={{ color: 'grey', textAlign: 'center' }}>
              {error.message}
            </h1>
          )}

          {imagesCount > 0 && (
            <ImageGallery
              articles={articles}
              onImageClick={this.handleImageClick}
            />
          )}

          {imagesCount > 0 && imagesCount !== this.state.totalHits && (
            <Button onLoadMore={this.handleLoadMore} />
          )}

          {imagesCount > 0 && imagesCount === this.state.totalHits && (
            <Notification />
          )}
        </>

        <div>
          {showModal && (
            <Modal onClose={this.toggleModal}>
              {<img src={this.state.largeImageURL} alt={this.state.tags} />}
            </Modal>
          )}
          <ToastContainer
            autoClose={3000}
            position="top-center"
            theme="light"
            pauseOnHover
          />
        </div>
      </>
    );
  }
}
