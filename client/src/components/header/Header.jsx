import axios from "axios";
import React, { useEffect, useContext, useState } from "react"
import { Context } from "../../context/Context"
import "./header.scss"

export default function Header({posts}) {
  const { user } = useContext(Context);
  const [post,setPost] = useState({});
  
  useEffect(() => {
    const getPinnedPost = async()=> {
      const res = await axios.get("http://localhost:5000/api/post");
      const getRandomInt = (max) => {
        return Math.floor(Math.random()*max)
      }
      const resPost = [...res.data]
      console.log("Posts In Header",resPost);
      const NumberOfPosts = resPost.length - 1;
      const randomNumber = getRandomInt(NumberOfPosts)
      const pinnedPost = resPost[randomNumber];
      console.log("PinnedPosts In Header",pinnedPost);
      setPost(pinnedPost);
    } 
    getPinnedPost();
    console.log("header useEffect Rendered")
  }, [user]);
  
  const DEFAULT_IMG_URL = "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80"
  const PF = "http://localhost:5000/images/"
  
  return (
    <div className="header">
        <div className="header-pinned">
          <img src={ post.photo ? PF + post.photo :DEFAULT_IMG_URL } alt="타이틀이미지" className="header-img" />
          <div className="curtain"></div>
          <div className="header-pinned-post">
            <div className="header-titles">
                <span className="header-title-small">{user ? "Cover Stroy" : "Today's pick"}</span>
                <span className="header-title-large">{post.title}</span>
            </div>
            <div className="header-desc">{post.desc}</div>
          </div>
        </div>
    </div>
  )
}
