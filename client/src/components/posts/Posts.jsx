import { useState, useEffect } from "react";
import Post from "../post/Post"
import "./posts.scss"
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();
  const [page, setPage] = useState({skip:0, limit:4});
  useEffect(() => {
      const fetchPosts = async () => {
          const res = await axios.get("http://localhost:5000/api/post" + search + `/?skip=${page.skip}&limit=${page.limit}`);
          console.log("search가 바뀌었을때 res.data",res.data)
          console.log("post exist, get skipped post");
          const newItems = []
          newItems.push(...posts, ...res.data);
          setPosts(newItems);
          console.log(posts,"after set posts in useEffect");
      }
      fetchPosts();
  },[search,page])
  console.log(page,"rendered");
  console.log(posts,"before return")
  const handleAddPost = () => {
    setPage((prev) => ({...prev, skip:prev.skip + prev.limit}))
  } 
  return (
    <div className="posts">
      {/* {posts.map((contents,index) => <Post post={posts[posts.length-1-index]} key={posts[posts.length-1-index]._id} />)} */}
      {posts.map((contents) => <Post post={contents} key={contents._id} />)}
      <button type="button" className="posts-more" onClick={handleAddPost}>포스트 더 보기</button>
    </div>
  )
}
