import "./write.scss"

export default function Write() {
  return (
    <div className="write">
        <img src="https://images.unsplash.com/photo-1648627667069-7b75daf5b8d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2045&q=80" alt="업로드 사진" className="write-img" />
        <form className="write-form">
            <div className="write-form-group">
                <label htmlFor="file-input">
                    <i className="write-icon fa-solid fa-file-circle-plus"></i>
                </label>
                <input type="file" id="file-input" style={{display:"none"}} />
                <input type="text" placeholder="제목을 적어주세요..." autoFocus={true} className="write-input" />
            </div>
            <div className="write-form-group">
                <textarea placeholder="당신의 이야기를 들려주세요..." type="text" className="write-input write-text"></textarea>
            </div>
            <button className="write-submit">출판하기</button>
        </form>
    </div>
  )
}
