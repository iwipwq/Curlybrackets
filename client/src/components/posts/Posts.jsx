import { useState, useEffect, useContext } from "react";
import Post from "../post/Post"
import "./posts.scss"
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();
  const { user } = useContext(Context);
  const [page, setPage] = useState({skip:0, limit:4});
  const [isPostsLeft, setIsPostsLeft] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
      const fetchPosts = async () => {
          setIsPostsLeft(true);
          setPosts([]);
          setPage({skip:0, limit:4});
          const res = await axios.get("http://localhost:5000/api/post" + (search ? `${search}&` : `/?`) + `skip=${page.skip}&limit=${page.limit}`);
          console.log("search가 바뀌었을때 res.data",res.data)
          console.log("post exist, get skipped post");
          setPosts(res.data);
          console.log(posts,"after set posts in useEffect");
      }
      fetchPosts();
  },[search])
  const addSkip = () => {
    setPage((prev) => ({...prev, skip:prev.skip + prev.limit}))
  }
  useEffect(() => {
    const fetchMorePost = async () => {
      const res = await axios.get("http://localhost:5000/api/post" + (search ? `${search}&` : `/?`) + `skip=${page.skip}&limit=${page.limit}`);
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
  console.log(search,"serach");
  console.log(page,"rendered");
  console.log(posts,"before return")
  return (
    <div className="posts-wrapper">
      {/* {posts.map((contents,index) => <Post post={posts[posts.length-1-index]} key={posts[posts.length-1-index]._id} />)} */}
      <div className="posts">{posts.map((contents) => <Post post={contents} key={contents._id} />)}</div>
      {isPostsLeft ? <button type="button" className="posts-more" onClick={handleAddPost} disabled={isFetching ? true : false}>포스트 더 보기</button>
      : <div className="no-more-post">
          <p>보여드릴 포스트가 없어요...</p>
          <p>직접 글을 써보시는건 어때요?</p>
          <p>오늘 먹은 밥, 내가 좋아하는 것...</p>
          <p>어떤 이야기든 괜찮습니다!</p>
          <Link to={user ? "/write" : "/register"} className="get-started-write">{user ? "글 써보기" :"회원가입하고 글 쓰기"}</Link>
        </div>}
    </div>
  )
}
