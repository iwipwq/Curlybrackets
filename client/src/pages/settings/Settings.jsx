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
  const [bio,setBio] = useState("")
  const [errors,setErrors] = useState({});
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
    // const validateUsername = (username) => {
    //   const testValidLength = 1 <= username.length && username.length <= 12;
    //   if(testValidLength) {
    //     const testValidChar = /^([a-Zㄱ-ㅎㅏ-ㅣ가-힣0-9])$/.test(username)
    //     if(testValidChar) {
    //       return (true);
    //     } else {
    //       alert("특수문자를 제외한 한글,영문,숫자만 가능합니다");
    //       return (false);
    //     }
    //   } else {
    //     alert("유저명은 1자 이상 12자 이하로 정해주세요");
    //     return (false);
    //   }
    // };

    const errors = {}
    const valid = {}

    const validateUsername = (username) => {
      const isLengthValid = /^[A-Za-z\d@$!%*?&]{1,12}$/.test(password);
      const isLetterValid = /^([a-Zㄱ-ㅎㅏ-ㅣ가-힣0-9])$/.test(username);
      switch (false) {
        case isLengthValid:
          valid["name"] = false;
          errors["name"] = "이름은 1자 이상 12자 이하로 해주세요";
          break;
        
        case isLetterValid:
          valid["name"] = false;
          errors["name"] = "이름은 한글,영문,숫자만 사용가능합니다.";
          break;
      
        default:
          valid["name"] = true;
          valid["message"] = "사용가능한 닉네임입니다.";
          break;
      }
    }

    const validatePassword = (password) => {
      const islengthValid = /^[A-Za-z\d@$!%*?&]{3,20}$/.test(password);
      const atLeastOneUpperLowercaseLetter = /^(?=.*[a-z])(?=.*[A-Z])$/.test(password);
      const atLeastOneNumber = /^(?=.*\d)$/.test(password);
      const atLeastOneSpecialCharacter = /^(?=.*[@$!%*?&])$/.test(password);
      switch (false) {
        case islengthValid:
          valid["password"] = false;
          errors["password"] = "비밀번호는 3자 이상 20자 이하만 가능합니다."
          break;
        
        case atLeastOneUpperLowercaseLetter:
          valid["password"] = false;
          errors["password"] = "영문 소문자,대문자가 각각 1개 이상 포함되어야 합니다."
          break;
        
        case atLeastOneNumber:
          valid["password"] = false;
          errors["password"] = "숫자가 1개 이상 포함되어야 합니다."
          break;
        
        case atLeastOneSpecialCharacter:
          valid["password"] = false;
          errors["password"] = "특수문자가 1개 이상 포함되어야 합니다."
          break;
      
        default:
          valid["password"] = true;
          valid["message"] = "사용가능한 비밀번호입니다."
          break;
      }
    }

    // const validateEmail = (email) => {
    //   const isEmailForm = 
    // }

    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
      biography: bio,
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
            <div className="settings-profile-wrap">
              <label htmlFor="">사용자 이름</label>
              <input type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)}/>
              <span className="settings-error">{errors["name"]}</span>
              <label htmlFor="">이메일</label>
              <input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)}/>
              <span className="settings-error">{errors["email"]}</span>
              <label htmlFor="">비밀번호</label>
              <input type="password" onChange={(e) => setPassword(e.target.value)}/>
              <span className="settings-error">{errors["password"]}</span>
            </div>
            <label htmlFor="settings-bio">자기소개</label>
            <textarea onChange={(e) => setBio(e.target.value)} cols="30" rows="10" className="settings-bio"></textarea>
            <button className="settings-submit" type="submit">수정하기</button>
          </form>
          { success && <span style={{color:"green"}}>프로필이 정상적으로 업로드되었습니다.</span>}
        </div>
    </div>
  )
}
