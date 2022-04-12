import axios from "axios";
import { useContext, useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import { Context } from "../../context/Context"
import "./settings.scss"
import userIcon from "../../img/icon-user.png"

export default function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const PF = "http://localhost:5000/images/"
  if(user.profileImg) {
    console.log("image yesyse")
  } else if (!user.profileImg) {
    console.log("image nono")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"});
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if(file) {
      const formData = new FormData();
      const filename = Date.now() + file.name;
      formData.append("name",filename);
      formData.append("file",file);
      updatedUser.profileImg = filename;
      console.log(updatedUser,"updateprofile")
      for (let value of formData.values()){
        console.log(value);
      };
      try {
        console.log("trying upload")
        await axios.post("http://localhost:5000/api/upload", formData);
      } catch (err) {
        console.dir(err,"multer업로드중 에러");
      }
    }
    try {
      const res = await axios.put(`http://localhost:5000/api/user/${user._id}`, updatedUser);
      setSuccess(true);
      dispatch({type:"UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      console.dir(err,"서버업로드중에러");
      dispatch({type:"UPDATE_FAILURE"});
    }
  };

  return (
    <div className="settings">
        <Sidebar />
        <div className="settings-wrapper">
          <div className="settings-title">
            <span className="settings-update-title">내 정보 수정하기</span>
            <span className="settings-delete-title">계정 삭제하기</span>
          </div>
          <form className="settings-form" onSubmit={handleSubmit}>
            <label htmlFor="">프로필 사진</label>
            <div className="settings-profile-img">
              <img src={file ? URL.createObjectURL(file) : !user.profileImg ? userIcon : PF + user.profileImg} alt="프로필 이미지" />
              <label htmlFor="file-input">
                <i className="settings-profile-img-icon fa-solid fa-arrow-up-from-bracket"></i>
              </label>
              <input type="file" id="file-input" style={{display:"none"}} onChange={(e) => {setFile(e.target.files[0])}}/>
            </div>
            <label htmlFor="">사용자 이름</label>
            <input type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)}/>
            <label htmlFor="">이메일</label>
            <input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="">비밀번호</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)}/>
            <button className="settings-submit" type="submit">수정하기</button>
          </form>
          { success && <span style={{color:"green"}}>프로필이 정상적으로 업로드되었습니다.</span>}
        </div>
    </div>
  )
}
