import React, { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/authSlice";
import {Link} from "react-router-dom";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onLogin = () => {
    dispatch(
      login({
        email,
        password
      })
    );
  }

  return (
    <div className="form">
      <h1 className="form__title">Login</h1>
      <div className="form__row">
        <label className="form__label">Email:</label>
        <input
          className="form__input"
          type="text"
          placeholder="Enter your email"
          onChange={event => setEmail(event.target.value)}
        />
      </div>
      <div className="form__row">
        <label className="form__label">Password:</label>
        <input
          className="form__input"
          type="password"
          placeholder="Enter your password"
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <div className="form__buttons">
        <button className="form__button" onClick={onLogin}>Login</button>
      </div>
      <div className="form__question">
        <p>Do not have an account? <Link to='/auth/register'>Register</Link></p>
      </div>
    </div>
  )
};

export default LoginPage;