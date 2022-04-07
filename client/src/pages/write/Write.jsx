import "./write.scss"
import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";

export default function Write() {
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [file,setFile] = useState(null);
    const { user } = useContext(Context);

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
            try {
                console.log("try upload");
                await axios.post("http://localhost:5000/api/upload", data);
            } catch (err) {
                console.log(err);
            }
        }
        try {
            console.log("try post");
            const res = await axios.post("http://localhost:5000/api/post", newPost);
            window.location.replace("http://localhost:5000/post/" + res.data._id);
        } catch (err) {
            console.log(err);
        }
    }
  return (
    <div className="write">
        { file && (
            <img src={URL.createObjectURL(file)} alt="업로드 사진" className="write-img"/>
        )}
        <form className="write-form" onSubmit={handleSubmit}>
            <div className="write-form-group">
                <label htmlFor="file-input">
                    <i className="write-icon fa-solid fa-file-circle-plus"></i>
                </label>
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
