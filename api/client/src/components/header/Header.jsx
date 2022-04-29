import React, { useEffect, useContext, useState } from "react"
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context"
import "./header.scss"

export default function Header({posts}) {
  const { user } = useContext(Context);
  const [post,setPost] = useState({});
  const [postPhoto,setPostPhoto] = useState("");
  const PF = "http://iwipwq-nest.herokuapp.com/images/"
  const DEFAULT_IMG_URL = "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80"

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
      
      if(pinnedPost.photo) {
        const isUrlPhoto = /^(http|https|ftp):\/\//.test(pinnedPost.photo);
        if(isUrlPhoto) {
            setPostPhoto(pinnedPost.photo);
          } else {
            setPostPhoto(PF + pinnedPost.photo)
        }
      }

      setPost(pinnedPost);
    } 
    getPinnedPost();
  }, [user]);

  // useEffect(() => {
  //   const getPostPhoto = () => {
  //     if(post.photo) {
  //       const isUrlPhoto = /^(http|https|ftp):\/\//.test(post.photo);
  //       if(isUrlPhoto) {
  //           setPostPhoto(post.photo);
  //         } else {
  //           setPostPhoto(PF + post.photo)
  //       }
  //     }
  //   }
  //   getPostPhoto();
  // }, [post]);
  
  return (
    <div className="header">
      {post ? 
      <div className="header-pinned">
        <img src={ postPhoto } alt="타이틀이미지" onError={(e)=>e.target.src=DEFAULT_IMG_URL} className="header-img" />
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
