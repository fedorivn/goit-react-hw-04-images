import PropTypes from 'prop-types';
import  { useEffect} from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay, ModalEl } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
    onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
 
    return createPortal(
      <ModalOverlay onClick={handleBackdropClick}>
        <ModalEl>{children}</ModalEl>
      </ModalOverlay>,
      modalRoot
    );
  }

  Modal.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
