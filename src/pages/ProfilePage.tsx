import React, { useEffect, useState } from "react";
import {API_SERVICES} from "../utils/constants";
import {headers, httpService} from "../utils/http";
import HeaderComponent from "../components/HeaderComponent";
import {registerTypes} from "../utils/types";

const ProfilePage = () => {
  const [data, setData] = useState<registerTypes>()
  const [hiddenInput, setHiddenInput] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [idUser, setIdUser] = useState<string>('');

  const onUpdate = () => {
    setHiddenInput(!hiddenInput);
    setFullName(data?.fullName || '');
    setEmail(data?.email || '');
    setPhone(data?.phone || '');
    setAddress(data?.address || '');
  };

  const onSave = async () => {
    const body = {
      fullName,
      email,
      phone,
      address
    };
    await httpService.post(API_SERVICES.PROFILE_UPDATE + `/${idUser}`, body, headers )
      .then(res => {
        console.log(res.data)
        if (res.data.success) setHiddenInput(!hiddenInput);
      }).catch(err => {
        console.log(err)
      })
  };

  useEffect(() => {
    const getDataProfile = async () => await httpService.get(API_SERVICES.PROFILE, headers);
    getDataProfile()
      .then(res => {
        console.log(res.data);
        if (res.data.success) {
          setData(res.data.profile);
          setIdUser(res.data.profile._id);
        }
      }).catch(err => {
      console.log(err);
    })
  }, [hiddenInput]);

  return (
    <div>
      <HeaderComponent />
      <div className="form">
        <h1 className="form__title">Profile</h1>
        <div className="form__row">
          <label className="form__label">FullName:</label>
          {
            !hiddenInput
            ? <p className="form__input">{ data?.fullName }</p>
            : <input
              className="form__input"
              type="text"
              placeholder="Full name"
              value={ fullName }
              onChange={event => setFullName(event.target.value)}
            />
          }
        </div>
        <div className="form__row">
          <label className="form__label">Email:</label>
          {
            !hiddenInput
              ? <p className="form__input">{ data?.email }</p>
              : <input
                className="form__input"
                type="email"
                placeholder="Email"
                value={ email }
                onChange={event => setEmail(event.target.value)}
              />
          }
        </div>
        <div className="form__row">
          <label className="form__label">Phone:</label>
          {
            !hiddenInput
              ? <p className="form__input">{ data?.phone }</p>
              : <input
                className="form__input"
                type="text"
                placeholder="Phone"
                value={ phone }
                onChange={event => setPhone(event.target.value)}
              />
          }
        </div>
        <div className="form__row">
          <label className="form__label">Address:</label>
          {
            !hiddenInput
              ? <p className="form__input">{ data?.address }</p>
              : <input
                className="form__input"
                type="text"
                placeholder="Address"
                value={ address }
                onChange={event => setAddress(event.target.value)}
              />
          }
        </div>
        <div className="form__buttons">
          {
            !hiddenInput
              ? <button className="form__button" onClick={onUpdate}>Update</button>
              : <>
                  <button className="form__button" onClick={onUpdate}>Cancel</button>
                  <button className="form__button" onClick={onSave}>Save</button>
                </>
          }
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;