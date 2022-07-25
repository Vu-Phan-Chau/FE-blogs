import HeaderComponent from "./HeaderComponent";
import React, {useEffect, useState} from "react";
import {headers, httpService} from "../utils/http";
import {API_SERVICES} from "../utils/constants";
import {useLocation, useNavigate} from "react-router-dom";

const CreateBlogComponent = () => {
  const [title, setTitle]= useState<string>('');
  const [description, setDescription]= useState<string>('');
  const [url, setUrl]= useState<string>('');
  const [category, setCategory]= useState<string>('');
  const [id, setId]= useState<string>('');

  const navigate = useNavigate();
  const { state }: { state: any } = useLocation();

  const onCreate = async () => {
    const blog = {
      title,
      description,
      url,
      category
    };

    await httpService.post(API_SERVICES.CREATE_BLOG, blog, headers)
      .then(res => {
        console.log(res.data);
        navigate('/blog');
      }).catch(err => {
        console.log(err);
      })
  };

  const onSave = async () => {
    const body = {
      title,
      description,
      url,
      category
    };
    await httpService.post(API_SERVICES.UPDATE_BLOG + `/${id}`, body, headers)
      .then(res => {
        console.log(res.data);
        navigate('/blog');
      }).catch(err => {
        console.log(err)
      })
  }

  const onCancel = () => navigate('/blog');

  useEffect(() => {
    if (state) {
      setTitle(state.data[0].title);
      setDescription(state.data[0].description);
      setUrl(state.data[0].url);
      setCategory(state.data[0].category);
      setId(state.data[0]._id);
    }
  }, [state])

  return (
    <div>
      <HeaderComponent />
      <div className="form">
        <h1 className="form__title">{!state ? 'New blog' : 'Edit blog'}</h1>
        <div className="form__row">
          <label className="form__label">Title:</label>
          <input
            className="form__input"
            type="text"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div className="form__row">
          <label className="form__label form__label--top">Description:</label>
          <textarea
            className="form__input form__input--description"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
        </div>
        <div className="form__row">
          <label className="form__label">URL:</label>
          <input
            className="form__input"
            type="text"
            value={url}
            onChange={event => setUrl(event.target.value)}
          />
        </div>
        <div className="form__row">
          <label className="form__label">Category:</label>
          <input
            className="form__input"
            type="text"
            value={category}
            onChange={event => setCategory(event.target.value)}
          />
        </div>
        <div className="form__buttons">
          <button className="form__button" onClick={onCancel}>Cancel</button>
          {
            !state
            ? <button className="form__button" onClick={onCreate}>Create</button>
            : <button className="form__button" onClick={onSave}>Save</button>
          }
        </div>
      </div>
    </div>
  );
};

export default CreateBlogComponent;