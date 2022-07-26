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
  const [totalBlogs, setTotalBlogs] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(0);
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

  const onPrevious = () =>
    getAllBlogs(pageNumber-1).then(() => console.log('Get previous blogs pagination success!!!'));

  const onNext = () =>
    getAllBlogs(pageNumber+1).then(() => console.log('Get next blogs pagination success!!!'));

  const onDisableButton = (key: string) => {
    if (key === 'prev') return (pageNumber === 0) ? 'pagination__button--disabled' : '';
    if (key === 'next') return (pageNumber === totalBlogs - 1) ? 'pagination__button--disabled' : '';
  }

  const getAllBlogs = async (size: number) => {
    const body = {
      "pageNumber": size
    };
    await httpService.post(API_SERVICES.ALL_BLOG, body, headers)
      .then(res => {
        setData(res.data.results.blogs);
        setDataFilter(res.data.results.blogs);
        setTotalBlogs(res.data.results.totalBlogs);
        setPageNumber(res.data.results.pageNumber);
      }).catch(err => {
        console.log(err)
      })
  };

  const onPagination = (size: number) =>
    getAllBlogs(size).then(() => console.log('Get blogs pagination success!!!'));

  const Pagination = () => {
    const bindClass = (index: number) => (index === pageNumber) ? 'pagination__button--active' : '';
    return <div className="pagination__list">
      {
        Array.from(Array(totalBlogs), (e, i) => {
          return <button
            className={"pagination__button " + bindClass(i)}
            key={i}
            onClick={() => onPagination(i)}
          >
            {i + 1}
          </button>
        })
      }</div>
  }

  useEffect(() => {
    getAllBlogs(0).then(() => console.log('Get all blogs success!!!'));
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
        {
          totalBlogs > 1
          ? <div className="pagination">
              <div className="pagination__container">
                <button
                  className={"pagination__button " + onDisableButton('prev')}
                  onClick={onPrevious}
                >
                  Prev
                </button>
                <Pagination />
                <button
                  className={"pagination__button " + onDisableButton('next')}
                  onClick={onNext}
                >
                  Next
                </button>
              </div>
            </div>
          : <></>
        }
      </div>
    </div>
  );
};

export default BlogPage;