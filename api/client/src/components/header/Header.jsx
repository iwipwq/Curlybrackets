import React, { useEffect, useContext, useState } from "react"
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context"
import "./header.scss"

export default function Header({posts}) {
  const { user } = useContext(Context);
  const [post,setPost] = useState({});
  
  useEffect(() => {
    const getPinnedPost = async()=> {
      const res = await axiosInstance.get("/post");
      const getRandomInt = (max) => {
        return Math.floor(Math.random()*max)
      }
      const resPost = [...res.data]
      const NumberOfPosts = resPost.length - 1;
      const randomNumber = getRandomInt(NumberOfPosts)
      const pinnedPost = resPost[randomNumber];
      setPost(pinnedPost);
    } 
    getPinnedPost();
  }, [user]);
  
  const DEFAULT_IMG_URL = "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80"
  const PF = "https://iwipwq-nest.herokuapp.com/images/"
  
  return (
    <div className="header">
      {post ? 
      <div className="header-pinned">
        <img src={ post.photo ? PF + post.photo :DEFAULT_IMG_URL } alt="타이틀이미지" className="header-img" />
        <div className="curtain"></div>
        <div className="header-pinned-post">
          <div className="header-titles">
              <span className="header-title-small">{user ? "Cover Stroy" : "Today's pick"}</span>
              <span className="header-title-large">{post.title}</span>
          <div className="header-desc">{post.desc?.length <= 200 ? post?.desc : post.desc?.slice(200)+" ..."}</div>
          </div>
        </div>
      </div>
      : "Loading..."}
    </div>
  )
}
