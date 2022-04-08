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
    console.log(user);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
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
          setTitle(res.data.title);
          setDesc(res.data.desc);
      }
      getPost();
    }, [path]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/post/${post._id}`,{
                data: {username: user.username}
            });
            window.location.replace("/");
        } catch(err) {
            console.log(err);
        }
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/api/post/${post._id}`, {
                username: user.username,
                title: title,
                desc:desc
            })
            setUpdateMode(false);
        } catch (err) {
            console.dir(err);
        }
    }
    return (
        <div className="single-post">
            <div className="single-post-wrapper">
                {post.photo !== undefined ?
                    (
                        <img src={ PF + post.photo } alt="포스트이미지" className="single-post-img" />
                    )
                : null}
                {
                    updateMode ? 
                    <input 
                        type="text" 
                        value={title} 
                        className="single-post-title-input"
                        onChange={(e)=>setTitle(e.target.value)}
                        autoFocus 
                    /> : 
                    (
                        <h1 className="single-post-title">{title}</h1>                       
                    )
                }

                <div className="single-post-info">
                    <address className="single-post-author">Author :<Link to={`/?user=${post.username}`} rel="author">{post.username}</Link></address>
                    <time 
                        dateTime={post.createdAt} 
                        title={new Date(post.createdAt).toLocaleDateString("ko-KR", options)} 
                        className="single-post-date">
                            {new Date(post.createdAt).toLocaleDateString("ko-KR", options)}
                    </time>
                </div>

                { updateMode ? 
                    <textarea 
                        className="single-post-desc-input" 
                        value={desc} 
                        onChange={(e)=>setDesc(e.target.value)} 
                    /> :
                    <p className="single-post-desc">{desc}</p>
                }
                {post.username === user?.username &&
                    <div className="single-post-edit">
                        <div className="single-post-edit-wrapper">
                            <i className={ updateMode ? "single-post-icon fa-solid fa-upload" : "single-post-icon far fa-edit" } 
                            onClick={ updateMode ? handleUpdate : () => setUpdateMode(true)}></i>
                            <i className={ updateMode ? "single-post-icon fa-solid fa-xmark" : "single-post-icon far fa-trash-alt"} 
                            onClick={ updateMode ? () => setUpdateMode(false) : handleDelete}></i>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
