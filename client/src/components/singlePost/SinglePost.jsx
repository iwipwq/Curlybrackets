import "./singlepost.scss"

export default function SinglePost() {
  return (
    <div className="single-post">
        <div className="single-post-wrapper">
            <img src="https://images.unsplash.com/photo-1648142504219-d13505bcac0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" alt="포스트이미지" className="single-post-img" />
            <h1 className="single-post-title">첫 블로그 포스팅</h1>

            <div className="single-post-info">
                <address className="single-post-author">Author : <a href="/about.html" rel="author">문홍</a></address>
                <time dateTime="2022-03-29T04:06:52.000Z" title="2022년 03월 29일" className="single-post-date">1 hour ago</time>
            </div>

            <p className="single-post-desc">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel consequuntur corrupti magni minima commodi, at ratione doloribus quibusdam sunt explicabo ut aperiam, sed quos esse fuga veniam assumenda! Fugit, nam.
                Corporis rem error fugiat asperiores. A, sint molestiae magni fuga distinctio ducimus, illum nulla explicabo culpa tenetur vitae. Qui vero asperiores sapiente officia sit quas dignissimos doloribus? Assumenda, illum aperiam.
                Cum ipsum facilis, iste cumque ullam asperiores, consectetur, veritatis eligendi quod repudiandae amet! Earum placeat ea cupiditate quos perspiciatis, excepturi illo iusto omnis sapiente voluptatum, sit non molestias explicabo magni.

                Enim modi id dolores hic minima similique ratione accusantium voluptas. Nesciunt officiis enim id, officia reprehenderit cum culpa fuga mollitia cumque laudantium, corrupti porro. Quisquam iusto magnam voluptatibus quo asperiores?
                Aspernatur tenetur atque ut id exercitationem illum optio laboriosam inventore iure labore cumque obcaecati error nihil deleniti nulla, repellendus necessitatibus. Soluta blanditiis esse omnis ducimus. Reiciendis unde nihil reprehenderit consequuntur.
                Aliquam, ipsum dignissimos quod voluptates autem labore ad fugit soluta porro, dicta natus quia laudantium rem explicabo totam laborum nemo temporibus, animi veritatis reiciendis ullam inventore accusantium? Iusto, vitae voluptatem.

                Aliquid dolor quaerat maxime facilis omnis in, architecto odit nemo, corrupti deleniti eligendi repellat earum excepturi quae maiores culpa nam, optio cupiditate iste rerum atque! Laudantium qui aliquid iste tenetur!
                Illum exercitationem aspernatur enim minus provident, reiciendis sed quos alias optio autem fuga qui, a perspiciatis assumenda placeat magnam modi! Harum eius voluptatem corrupti sapiente illum vero quas quis iusto!
            </p>

            <div className="single-post-edit">
                <div className="single-post-edit-wrapper">
                    <i className="single-post-icon far fa-edit"></i>
                    <i className="single-post-icon far fa-trash-alt"></i>
                </div>
            </div>

        </div>
    </div>
  )
}
