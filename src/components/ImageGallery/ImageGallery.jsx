import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ articles, onImageClick }) => {
  return (
    <Gallery>
      {articles.map(({ id, tags, webformatURL }, index) => {
        return (
          <ImageGalleryItem
            key={id}
            index={index}
            tags={tags}
            ImgURL={webformatURL}
            onImageClick={onImageClick}
          />
        );
      })}
    </Gallery>
  );
};
ImageGallery.propTypes = {
  onImageClick: PropTypes.func.isRequired,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
