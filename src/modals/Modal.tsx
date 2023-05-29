import "../assets/modals/Modal.scss"
import {modalTypes} from "../utils/types";

const Modal = ({dataModel, onHandleButton }: {dataModel: modalTypes, onHandleButton: (key: string) => void}) => {
  console.log(dataModel)
  return (
    <div className="modal">
      <div className="modal__container">
        <div className="modal__header">
          <h1>{dataModel.title}</h1>
        </div>
        <div className="modal__body">
          <p>{dataModel.message}</p>
        </div>
        <div className="modal__footer">
          {
            dataModel.buttons.map(item =>
              <button key={item.key} className="modal__button" onClick={() => onHandleButton(item.key)}>{ item.value }</button>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Modal;