import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SearchBar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Notification } from 'components/Notification/Notification';
import { Title } from './App.styled';
import fetchImages from 'service/pixabay-api';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const galleryRef = useRef(null);

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function fetchGalleryImages() {
      try {
        setIsLoading(true);
        const imageData = await fetchImages(query, page);

        setTotalHits(imageData.totalHits);

        if (imageData.hits.length === 0) {
          toast.warning(
            'No results were found for your search, please try something else.'
          );
          return;
        }

        setArticles(state => [...state, ...imageData.hits]);
      } catch (error) {
        setError(new Error(`Sorry something went wrong. ${error.message}`));

        toast.error(`Sorry something went wrong. ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGalleryImages();
  }, [query, page]);

  const handleFormSubmit = text => {
    setPage(1);
    setQuery(text.trim());
    setArticles([]);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <>
        <SearchBar onSearchFormSubmit={handleFormSubmit} />

        {isLoading && <Loader />}
        {error && <Title>{error.message}</Title>}

        {articles.length > 0 && <ImageGallery articles={articles} />}

        {articles.length > 0 && totalHits !== articles.length && (
          <Button onLoadMore={handleLoadMore} />
        )}

        {articles.length > 0 && totalHits === articles.length && (
          <Notification />
        )}
      </>

      <ToastContainer
        autoClose={3000}
        position="top-center"
        theme="light"
        pauseOnHover
      />
    </>
  );
};

