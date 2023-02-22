import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ articles }) => {
  return (
    <Gallery>
      {articles.map(({ id, tags, webformatURL, largeImageURL }, index) => {
        return (
          <ImageGalleryItem
            key={id}
            index={index}
            tags={tags}
            ImgURL={webformatURL}
            largeImageURL={largeImageURL}
          />
        );
      })}
    </Gallery>
  );
};
ImageGallery.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
