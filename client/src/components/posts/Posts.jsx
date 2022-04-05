import Post from "../post/Post"
import "./posts.scss"

export default function Posts({posts}) {
  return (
    <div className="posts">
      {posts.map((contents) => <Post post={contents} key={contents._id} />)}
    </div>
  )
}
