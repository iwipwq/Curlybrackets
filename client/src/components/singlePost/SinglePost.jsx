import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"
import { Context } from "../../context/Context";
import "./singlepost.scss"

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const { user } = useContext(Context);
    const PF = "http://localhost:5000/images/";
    const options = {
        day: 'numeric', 
        weekday: 'long',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timezone: 'Asia/Seoul',
    }

    useEffect(() => {
      const getPost = async () => {
          const res = await axios.get(`http://localhost:5000/api/post/${path}`);
          setPost(res.data);
      }
      getPost();
    }, [path]);

    return (
        <div className="single-post">
            <div className="single-post-wrapper">
                {post.photo !== undefined ?
                    (
                        <img src={ PF + post.photo } alt="포스트이미지" className="single-post-img" />
                    )
                : null}
                
                <h1 className="single-post-title">{post.title}</h1>

                <div className="single-post-info">
                    <address className="single-post-author">Author :<Link to={`/?user=${post.username}`} rel="author">{post.username}</Link></address>
                    <time 
                        dateTime={post.createdAt} 
                        title={new Date(post.createdAt).toLocaleDateString("ko-KR", options)} 
                        className="single-post-date">
                            {new Date(post.createdAt).toLocaleDateString("ko-KR", options)}
                    </time>
                </div>

                <p className="single-post-desc">{post.desc}</p>

                <div className="single-post-edit">
                    {post.username === user?.username &&
                    <div className="single-post-edit-wrapper">
                        <i className="single-post-icon far fa-edit"></i>
                        <i className="single-post-icon far fa-trash-alt"></i>
                    </div>
                    }
                </div>

            </div>
        </div>
    )
}
