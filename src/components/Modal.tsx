import { useEffect, useState } from 'react';
import { CloseIcon } from './icons';
import './Modal.scss';

interface ModalProps {
  modal: { content: JSX.Element, title: string } | null;
  closeModal: () => void;
}

const Modal = ({ modal, closeModal }: ModalProps) => {
  const [modalClasses, setModalClasses] = useState(' modal-hidden');

  useEffect(() => {
    if (modal) setModalClasses('');
    else setModalClasses(' modal-hidden');
  }, [modal]);

  const animateClose = () => {
    setModalClasses(' modal-hidden');
    setTimeout(closeModal, 300);
  };

  if (!modal) return null;
  return (
    <div className={`modal-wrapper${modalClasses}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title">{modal.title}</h1>
          <CloseIcon onClick={animateClose} className="modal-close" />
        </div>

        {modal.content}
      </div>
    </div>
  );
};

export default Modal;
