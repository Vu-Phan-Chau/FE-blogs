import {Link} from "react-router-dom";
import React, { useState } from "react";
import {register} from "../store/authSlice";
import {useAppDispatch} from "../store/hooks";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const onRegister = () => {
    dispatch(
      register({
        fullName,
        email,
        password,
        phone,
        address
      })
    )
  };

  return (
    <div className="form">
      <h1 className="form__title">Register</h1>
      <div className="form__row">
        <label className="form__label">FullName:</label>
        <input
          className="form__input"
          type="text"
          placeholder="Full name"
          onChange={event => setFullName(event.target.value)}
        />
      </div>
      <div className="form__row">
        <label className="form__label">Email:</label>
        <input
          className="form__input"
          type="email"
          placeholder="Email"
          onChange={event => setEmail(event.target.value)}
        />
      </div>
      <div className="form__row">
        <label className="form__label">Password:</label>
        <input
          className="form__input"
          type="password"
          placeholder="Password"
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <div className="form__row">
        <label className="form__label">Phone:</label>
        <input
          className="form__input"
          type="text"
          placeholder="Phone"
          onChange={event => setPhone(event.target.value)}
        />
      </div>
      <div className="form__row">
        <label className="form__label">Address:</label>
        <input
          className="form__input"
          type="text"
          placeholder="Address"
          onChange={event => setAddress(event.target.value)}
        />
      </div>
      <div className="form__buttons">
        <button className="form__button" onClick={onRegister}>Register</button>
      </div>
      <div className="form__question">
        <p>Already have an account. <Link to='/auth/login'>Login</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;