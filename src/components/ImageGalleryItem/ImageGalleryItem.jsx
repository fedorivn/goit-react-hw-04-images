import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';

import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ tags, largeImageURL, ImgURL }) => {
  const [showModal, setShowModal] = useState(false);

  //   useEffect(() => {
  //     showModal && document.body.style.overflow ('hidden');
  //     !showModal && document.body.style.overflow ('unset');
  //  }, [showModal]);

  // useEffect(
  //   () => (document.body.style.overflow = showModal ? 'hidden' : 'unset'),
  //   [showModal]
  // );

  return (
    <>
      <GalleryItem>
        <GalleryItemImg
          alt={tags}
          src={ImgURL}
          onClick={() => setShowModal(true)}
        />
      </GalleryItem>
      {showModal && (
        <Modal onClose={setShowModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  onImageClick: PropTypes.func,
  ImgURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
