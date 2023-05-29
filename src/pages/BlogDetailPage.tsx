import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import {headers, httpService} from "../utils/http";
import {API_SERVICES} from "../utils/constants";
import {blogTypes} from "../utils/types";

const BlogDetailPage = () => {
  let { id } = useParams();
  const [data, setData] = useState<blogTypes>();

  useEffect(() => {
    httpService.post(API_SERVICES.DETAIL_BLOG + `/${id}`, {}, headers)
      .then((res) => {
        setData(res.data.detailBlog)
      }).catch(err => {
        console.log(err)
    })
  }, [id])

  return (
    <div className="detail">
      <h1 className="detail__title">{data?.title}</h1>
      <p><img src={data?.url} alt=""/></p>
      <p className="detail__description">{data?.description}</p>
    </div>
  );
};

export default BlogDetailPage;