import "../assets/modals/Modal.scss"
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {RootState} from "../store";
import {handleModel} from "../store/authSlice";
import {useNavigate} from "react-router-dom";
import {modalTypes} from "../utils/types";

const Modal = ({dataModel}: {dataModel: modalTypes}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isHiddenModel } = useAppSelector((state: RootState) => state.auth);

  const onLogout = (key: string) => {
    if (key === 'yes') {
      localStorage.clear();
      navigate('/auth/login');
    }
    dispatch(handleModel(!isHiddenModel));
  };

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
              <button key={item.key} className="modal__button" onClick={() => onLogout(item.key)}>{ item.value }</button>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Modal;