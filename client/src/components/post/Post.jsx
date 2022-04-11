import { Link } from "react-router-dom"
import "./post.scss"

export default function Post({post}) {
  const PF = "http://localhost:5000/images/"
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
  return (
    <div className="post">
        { post.photo && (
          <img src={ PF + post.photo } alt="포스트이미지" className="post-img" />
        )}
        <div className="post-info">
            <div className="post-cats">
              {post.categories.map((category) => (
              <span className="post-cat">{category}</span>
              ))}
            </div>
            <Link to={`/post/${post._id}`} className="link">
              <span className="post-title">{post.title}</span>
            </Link>
            <span className="post-date">{new Date(post.createdAt).toLocaleDateString('ko-KR',options)}</span>
        </div>
        <p className="post-desc">{post.desc}</p>
    </div>
  )
}
