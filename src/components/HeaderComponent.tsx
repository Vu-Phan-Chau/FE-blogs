import {LOCAL_STORAGE, MODALS} from "../utils/constants";
import {Link} from "react-router-dom";
import Modal from "../modals/Modal";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {RootState} from "../store";
import {handleModel} from "../store/authSlice";

const HeaderComponent = () => {
  const dispatch = useAppDispatch()

  const { isHiddenModel } = useAppSelector((state: RootState) => state.auth);

  const onLogout = () => dispatch(handleModel(!isHiddenModel));

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
      { isHiddenModel ?  <Modal dataModel={MODALS.modalLogout} /> : <></> }
    </header>
  );
};

export default HeaderComponent;