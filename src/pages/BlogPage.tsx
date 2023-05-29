import HeaderComponent from "../components/HeaderComponent";
import React, {useEffect, useState} from "react";
import {headers, httpService} from "../utils/http";
import {API_SERVICES, MODALS} from "../utils/constants";
import "../assets/BlogPage.scss"
import {Link} from "react-router-dom";
import {blogTypes, modalTypes} from "../utils/types";
import {useNavigate} from "react-router-dom";
import SearchComponent from "../components/SearchComponent";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {RootState} from "../store";
import Modal from "../modals/Modal";
import {handleModel} from "../store/authSlice";

const BlogPage = () => {
  const [data, setData] = useState<Array<blogTypes>>([]);
  const [dataFilter, setDataFilter] = useState<Array<blogTypes>>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [totalBlogs, setTotalBlogs] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [id, setID] = useState<string>('');
  const [modalData, setModalData] = useState<modalTypes>(MODALS.modalDelete);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isHiddenModel } = useAppSelector((state: RootState) => state.auth);

  const filterData = (id: string) => data.filter(item => item._id === id);

  const onUpdate = (id: string) => navigate('/blog/create', { state: {key: 'edit', data: filterData(id)} });

  const onDelete = async (id: string) => {
    setID(id);
    setModalData(MODALS.modalDelete);
    dispatch(handleModel(!isHiddenModel));
  }

  const onHandleButton = async (key: string) => {
    if (key === 'yes') {
      await httpService.post(API_SERVICES.DELETE_BLOG + `/${id}`, {}, headers)
        .then(res => {
          console.log(res.data)
          setRefresh(!refresh)
        }).catch(err => {
          console.log(err)
        })
    }
    dispatch(handleModel(!isHiddenModel));
  };

  const onSearchFilter = (search: string) => {
    // const filteredSearch = dataFilter.filter(item => {
    //   if (item.title.toLowerCase().includes(search.toLowerCase())
    //     || item.category.toLowerCase().includes(search.toLowerCase())) {
    //     return item
    //   }
    //   return false
    // });
    // setData(filteredSearch);

    if (search) {
      getQueryBlogs(0, search).then()
    } else {
      getAllBlogs(0).then()
    }
  };

  const onPrevious = () =>
    getAllBlogs(pageNumber-1).then();

  const onNext = () =>
    getAllBlogs(pageNumber+1).then();

  const onDisableButton = (key: string) => {
    if (key === 'prev') return (pageNumber === 0) ? 'pagination__button--disabled' : '';
    if (key === 'next') return (pageNumber === totalBlogs - 1) ? 'pagination__button--disabled' : '';
  }

  const getQueryBlogs = async (size: number, value: string) => {
    const body = {
      "pageNumber": size,
      "title": value,
      "category": value
    };
    await httpService.post(API_SERVICES.QUERY_BLOG, body, headers)
      .then(res => {
        setData(res.data.results.blogs);
        setTotalBlogs(res.data.results.totalBlogs);
        setPageNumber(res.data.results.pageNumber);
      }).catch(err => {
        console.log(err)
      })
  };

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
    getAllBlogs(size).then();

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
  };

  useEffect(() => {
    getAllBlogs(0).then();
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
                <Link className="blog__img" to={"/blog/detail/" + item._id}>
                  <img src={item.url} alt={item.category}/>
                </Link>
                <div className="blog__info">
                  <h4>
                    <Link className="blog__info-title" to={"/blog/detail/" + item._id}>{item.title}</Link>
                    <span className="blog__info-category">{item.category}</span>
                  </h4>
                  <p className="blog__info-des">{item.summary}</p>
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
      { isHiddenModel ?  <Modal dataModel={modalData} onHandleButton={onHandleButton} /> : <></> }
    </div>
  );
};

export default BlogPage;