import { useState } from "react";
import Post from "../post/Post"
import "./posts.scss"

export default function Posts({posts}) {
  console.log(posts);
  console.log(posts.reverse());

  return (
    <div className="posts">
      {posts.map((contents,index) => <Post post={posts[posts.length-1-index]} key={posts[posts.length-1-index]._id} />)}
    </div>
  )
}
