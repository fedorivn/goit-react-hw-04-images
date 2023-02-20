import { createPortal } from 'react-dom';
import { Circles } from 'react-loader-spinner';
import { ModalOverlay } from '../Modal/Modal.styled';

const loaderRoot = document.querySelector('#loader-root');
export const Loader = () => {
  return createPortal(
    <ModalOverlay>
      <Circles color="#4ab2d8" height={300} width={300} />
    </ModalOverlay>,
    loaderRoot
  );
};
