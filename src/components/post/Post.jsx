import "./post.scss"

export default function Post() {
  return (
    <div className="post">
        <img src="https://images.unsplash.com/photo-1648350405746-16ab80c37907?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="포스트이미지" className="post-img" />
        <div className="post-info">
            <div className="post-cats">
                <span className="post-cat">Music</span>
                <span className="post-cat">Life</span>
            </div>
            <span className="post-title">
                Lorem ipsum dolor sit amet.
            </span>
            <hr />
            <span className="post-date">1 hour ago</span>
        </div>
        <p className="post-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos deleniti suscipit iure doloribus fuga, sint in animi dolorem quidem odio, exercitationem ex saepe facere voluptatum incidunt cupiditate, natus sed neque?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos deleniti suscipit iure doloribus fuga, sint in animi dolorem quidem odio, exercitationem ex saepe facere voluptatum incidunt cupiditate, natus sed neque?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos deleniti suscipit iure doloribus fuga, sint in animi dolorem quidem odio, exercitationem ex saepe facere voluptatum incidunt cupiditate, natus sed neque?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos deleniti suscipit iure doloribus fuga, sint in animi dolorem quidem odio, exercitationem ex saepe facere voluptatum incidunt cupiditate, natus sed neque?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos deleniti suscipit iure doloribus fuga, sint in animi dolorem quidem odio, exercitationem ex saepe facere voluptatum incidunt cupiditate, natus sed neque?</p>
    </div>
  )
}
