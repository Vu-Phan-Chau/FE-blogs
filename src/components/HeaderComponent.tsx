import {LOCAL_STORAGE, MODALS} from "../utils/constants";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {RootState} from "../store";
import {handleModel} from "../store/authSlice";
import {useState} from "react";
import {modalTypes} from "../utils/types";
import Modal from "../modals/Modal";

const HeaderComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [modalData, setModalData] = useState<modalTypes>(MODALS.modalLogout);

  const { isHiddenModel } = useAppSelector((state: RootState) => state.auth);

  const onLogout = () => {
    setModalData(MODALS.modalLogout);
    dispatch(handleModel(!isHiddenModel));
  };

  const onHandleButton = (key: string) => {
    console.log(key)
    if (key === 'yes') {
      localStorage.clear();
      navigate('/auth/login');
    }
    dispatch(handleModel(!isHiddenModel));
  };

  return (
    <header className="header">
      <Link className="header__button header__button--top" to="/">Top</Link>
      {
        LOCAL_STORAGE.GET_IS_LOGIN()
          ? <>
            <Link className="header__button" to="/blog">My blogs</Link>
            <Link className="header__button" to="/profile">Profile</Link>
            <button className="header__button" onClick={onLogout}>Logout</button>
          </>
          : <>
            <Link className="header__button" to="/auth/login">Login</Link>
            <Link className="header__button" to="/auth/register">Register</Link>
          </>
      }
      { isHiddenModel ?  <Modal dataModel={modalData} onHandleButton={onHandleButton} /> : <></> }
    </header>
  );
};

export default HeaderComponent;