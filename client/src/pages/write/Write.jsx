import "./write.scss"
import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import errorImg from "../../img/404page_d.jpg"

export default function Write() {
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [file,setFile] = useState(null);
    const [tempImgUrl,setTempImgUrl] = useState("");
    const [imgUrl,setImgUrl] = useState("");
    const [isMenuOpen,setIsMenuOpen] = useState(false);
    const { user } = useContext(Context);

    const handleUploadMenu= () => {
        setIsMenuOpen(prev => !prev);
        setTempImgUrl("");
    }

    const handleUrlInput = (e) => {
        const uploadedUrl = e.target.value;
        setFile(null);
        setTempImgUrl(uploadedUrl);
    }

    const handleFileInput = (e) => {
        const uploadedFile = e.target.files[0];
        setTempImgUrl("");
        setFile(uploadedFile);
        setIsMenuOpen(prev => !prev);
    }

    const sendTempImgToImgUrl = () => {
        setImgUrl(tempImgUrl);
        setIsMenuOpen(prev => !prev);
    }

    const handleInitFile = () => {
        setTempImgUrl("");
        setImgUrl("");
        setFile(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
        };
        if(file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name",filename)
            data.append("file",file)
            newPost.photo = filename;
            for (let value of data.values()){
                console.log(value);
              };
            try {
                console.log("try upload");
                await axios.post("http://localhost:5000/api/upload", data);
            } catch (err) {
                console.log(err.response.data);
            }
        } else if (imgUrl) {
            newPost.photo = imgUrl;
        }
        
        try {
            console.log("try post");
            const res = await axios.post("http://localhost:5000/api/post", newPost);
            window.location.replace("http://localhost:3000/post/" + res.data._id);
        } catch (err) {
            console.log(err);
        }
    }
  return (
    <div className="write">
        <div className="single-post-img-wrapper">
            { file && (<img src={URL.createObjectURL(file)} alt="업로드 사진" className="write-img"/>)}
            { imgUrl && (<img src={imgUrl} alt="업로드 사진" onError={(e)=>e.target.src = errorImg} className="write-img"/>)}
            <div className="single-post-img-edit">
                <div className="upload-button-wrapper">
                    <button type="button" onClick={handleInitFile} className="image-init-button"><i class="fa-solid fa-arrow-rotate-left"></i> 초기화</button>
                </div>
                <div className={ isMenuOpen ? "menu-curtain draw" : "menu-curtain"}></div>
                <div className={ isMenuOpen ? "upload-menu open" : "upload-menu"}>
                    <h2>이미지 업로드 하기</h2>
                    <p>이미지 파일(webp,jpg,png,gif...등)
                        만 업로드 가능합니다.</p>
                    <div className="single-post-file-wrapper">
                        <label htmlFor="file-input" className="single-post-file-label">직접 업로드하기</label>
                        <input type="file" id="file-input" onChange={handleFileInput} className="single-post-file-input" />
                    </div>
                    <div className="single-post-upload-devider">
                        <hr/>
                        <span>혹은</span>
                    </div>
                    <div className="single-post-url-wrapper">
                        <label htmlFor="file-url" className="single-post-url-label">이미지링크로 업로드하기</label>
                        <input type="url" id="file-url" onChange={handleUrlInput} className="single-post-url-input" />
                        <button type="button" onClick={sendTempImgToImgUrl} className="single-post-url-button">확인</button>
                    </div>
                    <button className="upload-menu-close-button" onClick={handleUploadMenu}>취소하고 창 닫기</button>
                </div>
            </div>
        </div>
        
        <form className="write-form" onSubmit={handleSubmit}>
            <div className="write-form-group">
                <button className="write-file-button" type="button" onClick={handleUploadMenu}>
                    <i className="write-icon fa-solid fa-file-circle-plus"></i>
                </button>
                
                
                <input type="file" id="file-input" style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])}/>
                <input 
                type="text" placeholder="제목을 적어주세요..." 
                autoFocus={true} className="write-input"
                onChange={(e)=>setTitle(e.target.value)} />
            </div>
            <div className="write-form-group">
                <textarea 
                placeholder="당신의 이야기를 들려주세요..." type="text" 
                className="write-input write-text" onChange={(e)=>setDesc(e.target.value)}></textarea>
            </div>
            <button className="write-submit">출판하기</button>
        </form>
    </div>
  )
}
