import Modal from 'react-modal';
import css from "./ImageModal.module.css"


export default function ImageModal({close,isOpen,data}) {




    return(
        <Modal
        isOpen={isOpen}
        onRequestClose={close}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
  
        contentLabel="modalTesting"

        className={css.modal}
        overlayClassName={css.modalOverlay}
        >
          <img src={data} alt="" className={css.image}  />
        </Modal>
    )
}
