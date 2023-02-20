import PropTypes from 'prop-types';

import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ tags, index, ImgURL, onImageClick }) => {
  return (
    <GalleryItem>
      <GalleryItemImg
        alt={tags}
        src={ImgURL}
        onClick={() => onImageClick(index)}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  onImageClick: PropTypes.func,
  ImgURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
