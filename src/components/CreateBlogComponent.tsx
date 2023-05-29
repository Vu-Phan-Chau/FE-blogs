import HeaderComponent from "./HeaderComponent";
import React, {useEffect, useState} from "react";
import {headers, httpService} from "../utils/http";
import {API_SERVICES} from "../utils/constants";
import {useLocation, useNavigate} from "react-router-dom";
import CategoryModal from "../modals/CategoryModal";
import {categoriesTypes} from "../utils/types";

const CreateBlogComponent = () => {
  const [title, setTitle]= useState<string>('');
  const [description, setDescription]= useState<string>('');
  const [summary, setSummary]= useState<string>('');
  const [url, setUrl]= useState<string>('');
  const [category, setCategory]= useState<string>('all');
  const [id, setId]= useState<string>('');
  const [hiddenModal, setHiddenModal]= useState<boolean>(false);
  const [listCategory, setListCategory] = useState<Array<categoriesTypes>>([]);

  const navigate = useNavigate();
  const { state }: { state: any } = useLocation();

  const onCreate = async () => {
    const blog = {
      title,
      summary,
      description,
      url,
      category
    };

    await httpService.post(API_SERVICES.CREATE_BLOG, blog, headers)
      .then(() => {
        navigate('/blog');
      }).catch(err => {
        console.log(err);
      })
  };

  const onSave = async () => {
    const body = {
      title,
      summary,
      description,
      url,
      category
    };
    await httpService.post(API_SERVICES.UPDATE_BLOG + `/${id}`, body, headers)
      .then(() => {
        navigate('/blog');
      }).catch(err => {
        console.log(err)
      })
  }

  const onCancel = () => navigate('/blog');

  const onHandelButton = async (key: string, value: string) => {
    if (key === 'add' && value) {
      await httpService.post(API_SERVICES.CREATE_CATEGORIES, { value: value }, headers)
        .then((res) => {
          console.log(res.data)
        }).catch(err => {
          console.log(err)
        })
    }
    setHiddenModal(!hiddenModal);
  }

  useEffect(() => {
    if (state) {
      setTitle(state.data[0].title);
      setSummary(state.data[0].summary);
      setDescription(state.data[0].description);
      setUrl(state.data[0].url);
      setCategory(state.data[0].category);
      setId(state.data[0]._id);
    }

    const getAllCategories = async () => await httpService.get(API_SERVICES.ALL_CATEGORIES, headers)
    getAllCategories()
      .then((res) => {
        setListCategory(res.data.categories)
      })
      .catch(err => console.log(err))
  }, [state, hiddenModal])

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
          <label className="form__label form__label--top">Summary:</label>
          <textarea
            className="form__input form__input--description"
            value={summary}
            onChange={event => setSummary(event.target.value)}
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
          <select
            className="form__select"
            onChange={(event) => setCategory(event.target.value)}
            value={category}
          >
            <option value="all">All</option>
            {
              listCategory.map((item) => {
                return <option key={item.key} value={item.key}>{item.value}</option>
              })
            }
          </select>
          <button className="form__addCategory" onClick={() => setHiddenModal(true)}>Add category</button>
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
      {
        hiddenModal ? <CategoryModal onHandelButton={onHandelButton} /> : <></>
      }
    </div>
  );
};

export default CreateBlogComponent;