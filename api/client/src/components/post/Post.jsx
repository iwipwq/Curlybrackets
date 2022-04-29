import { useState ,useEffect } from "react";
import { Link } from "react-router-dom"
import "./post.scss"
import errorImg from "../../img/404page_d.jpg"

export default function Post({post}) {
  const PF = "https://iwipwq-nest.herokuapp.com/images/"
  const [postPhoto,setPostPhoto] = useState();
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
    if(post) {
      const isUrlPhoto = /^(http|https|ftp):\/\//.test(post.photo);
      if(isUrlPhoto) {
          setPostPhoto(post.photo);
        } else {
          setPostPhoto(PF + post.photo)
      }
    }
  }, [])
  

  return (
    <div className="post">
        { post?.photo && (
          <img src={ postPhoto } onError={(e) => e.target.src = errorImg} alt="포스트이미지" className="post-img" />
        )}
        <div className="post-info">
            <div className="post-cats">
              {post.categories.map((category) => (
              <span className="post-cat" key={category._id}>{category.name}</span>
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
