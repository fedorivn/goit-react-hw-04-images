import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay, ModalEl } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <ModalOverlay onClick={this.handleBackdropClick}>
        <ModalEl>{this.props.children}</ModalEl>
      </ModalOverlay>,
      modalRoot
    );
  }
}
