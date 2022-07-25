import HeaderComponent from "../components/HeaderComponent";
import React, {useEffect, useState} from "react";
import {headers, httpService} from "../utils/http";
import {API_SERVICES} from "../utils/constants";
import "../assets/BlogPage.scss"
import {Link} from "react-router-dom";
import {blogTypes} from "../utils/types";
import {useNavigate} from "react-router-dom";
import SearchComponent from "../components/SearchComponent";

const BlogPage = () => {
  const [data, setData] = useState<Array<blogTypes>>([]);
  const [dataFilter, setDataFilter] = useState<Array<blogTypes>>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const navigate = useNavigate();

  const filterData = (id: string) => data.filter(item => item._id === id);

  const onUpdate = (id: string) => navigate('/blog/create', { state: {key: 'edit', data: filterData(id)} });

  const onDelete = async (id: string) => {
    console.log(id)
    await httpService.post(API_SERVICES.DELETE_BLOG + `/${id}`, {}, headers)
      .then(res => {
        console.log(res.data)
        setRefresh(!refresh)
      }).catch(err => {
        console.log(err)
      })
  }

  const onSearchFilter = (search: string) => {
    const filteredSearch = dataFilter.filter(item => {
      if (item.title.toLowerCase().includes(search.toLowerCase())
        || item.category.toLowerCase().includes(search.toLowerCase())) {
        return item
      }
      return false
    });
    setData(filteredSearch);
  };

  useEffect(() => {
    const getAllBlogs = async () => await httpService.get(API_SERVICES.ALL_BLOG, headers);
    getAllBlogs()
      .then(res => {
        setData(res.data.blogs);
        setDataFilter(res.data.blogs);
      }).catch(err => {
        console.log(err)
    })
  }, [refresh])

  return (
    <div>
      <HeaderComponent />
      <div className="blog">
        <h1 className="blog__title">Blog page <Link className="blog__create" to="/blog/create">New blog</Link></h1>
        <SearchComponent onSearchFilter={onSearchFilter} />
        <div className="blog__list">
          {
            data.map(item => (
            <div className="blog__row" key={item._id}>
              <Link className="blog__img" to="/blog">
                <img src={item.url} alt={item.category}/>
              </Link>
              <div className="blog__info">
                <h4>
                  <Link className="blog__info-title" to="/blog">{item.title}</Link>
                  <span className="blog__info-category">{item.category}</span>
                </h4>
                <p className="blog__info-des">{item.description}</p>
                <div className="blog__buttons">
                  <button className="blog__button" onClick={() => onUpdate(item._id)}>Update</button>
                  <button className="blog__button" onClick={() => onDelete(item._id)}>Delete</button>
                </div>
              </div>
            </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default BlogPage;