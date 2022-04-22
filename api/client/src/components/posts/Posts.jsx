import { useState, useEffect } from "react";
import Post from "../post/Post"
import "./posts.scss"
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../../config";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();
  const [page, setPage] = useState({skip:0, limit:4});
  const [isPostsLeft, setIsPostsLeft] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
      const fetchPosts = async () => {
          setIsPostsLeft(true);
          setPosts([]);
          setPage({skip:0, limit:4});
          const res = await axiosInstance.get("/post" + (search ? `${search}&` : `/?`) + `skip=${page.skip}&limit=${page.limit}`);
          setPosts(res.data);
      }
      fetchPosts();
  },[search])
  const addSkip = () => {
    setPage((prev) => ({...prev, skip:prev.skip + prev.limit}))
  }
  useEffect(() => {
    const fetchMorePost = async () => {
      const res = await axiosInstance.get("/post" + (search ? `${search}&` : `/?`) + `skip=${page.skip}&limit=${page.limit}`);
      const newItems = []
      newItems.push(...posts, ...res.data);
      if(res.data.length < page.limit) {
        setIsPostsLeft(false);
      }
      setPosts(newItems);
      setIsFetching(false);
    }
    fetchMorePost();
  },[page]);
  const handleAddPost = async () => {
    setIsFetching(true);
    addSkip();
  }
  return (
    <div className="posts-wrapper">
      <div className="posts">{posts.map((contents) => <Post post={contents} key={contents._id} />)}</div>
      {isPostsLeft && <button type="button" className="posts-more" onClick={handleAddPost} disabled={isFetching ? true : false}>포스트 더 보기</button>}
    </div>
  )
}
