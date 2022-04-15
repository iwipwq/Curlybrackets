import axios from "axios";
import { useContext, useState, useEffect } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import { Context } from "../../context/Context"
import "./settings.scss"
import userIcon from "../../img/icon-user.png"

export default function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio,setBio] = useState("")
  const [errors,setErrors] = useState({name:"init"});
  const [valid,setValid] = useState({name:false,message:"init"});
  const [success, setSuccess] = useState(false);
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const PF = "http://localhost:5000/images/"
  if(user.profileImg) {
    console.log("image yesyse")
  } else if (!user.profileImg) {
    console.log("image nono")
  }
  console.log(valid.name,errors);
  const validateUsername = (username) => {
    const valid = {}
    const error = {}
    const isLengthValid = /^[A-Za-z\d@$!%*?&]{1,12}$/.test(username);
    const isLetterValid = /^[a-zA-Z\u3131-\u318E\uAC00-\uD7A3\d]*$/.test(username);
    switch (false) {
      case isLengthValid:
        console.log("lengthvalidfailed")
        valid["name"] = false;
        error["name"] = "이름은 1자 이상 12자 이하로 해주세요";
        setValid({...valid});
        setErrors({...error});
        break;
      
      case isLetterValid:
        valid["name"] = false;
        error["name"] = "이름은 한글,영문,숫자만 사용가능합니다.";
        setValid({...valid});
        setErrors({...error});
        break;
    
      default:
        console.log("username valid");
        valid["name"] = true;
        error["name"] = "사용가능한 닉네임입니다.";
        setValid({...valid});
        setErrors({...error});
        console.log("valid값 변경",valid.name,valid["name"],valid);
        break;
    }
  }

  const validatePassword = (password) => {
    const valid = {}
    const error = {}
    const islengthValid = /^[A-Za-z\d@$!%*?&]{3,20}$/.test(password);
    const atLeastOneUpperLowercaseLetter = /^(?=.*[a-z])(?=.*[A-Z]).*$/.test(password);
    const atLeastOneNumber = /^(?=.*\d).*$/.test(password);
    const atLeastOneSpecialCharacter = /^(?=.*[@$!%*?&]).*$/.test(password);
    switch (false) {
      case islengthValid:
        valid["password"] = false;
        error["password"] = "비밀번호는 3자 이상 20자 이하만 가능합니다."
        setValid({...valid});
        setErrors({...error});
        break;
      
      case atLeastOneUpperLowercaseLetter:
        valid["password"] = false;
        error["password"] = "영문 소문자,대문자가 각각 1개 이상 포함되어야 합니다."
        setValid({...valid});
        setErrors({...error});
        break;
      
      case atLeastOneNumber:
        valid["password"] = false;
        error["password"] = "숫자가 1개 이상 포함되어야 합니다."
        setValid({...valid});
        setErrors({...error});
        break;
      
      case atLeastOneSpecialCharacter:
        valid["password"] = false;
        error["password"] = "특수문자가 1개 이상 포함되어야 합니다."
        setValid({...valid});
        setErrors({...error});
        break;
    
      default:
        valid["password"] = true;
        error["password"] = "사용가능한 비밀번호입니다."
        setValid({...valid});
        setErrors({...error});
        break;
    }
  }

  const validateEmail = (email) => {
    const valid = {};
    const error = {};
    const isEmailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    if(isEmailFormat) {
      valid["email"] = true;
      error["message"] = "사용가능한 이메일형식입니다."
      setValid({...valid});
      setErrors({...error});
    } else {
      valid["email"] = false;
      error["email"] = "이메일 형식으로 입력해주세요"
      setValid({...valid});
      setErrors({...error});
    }
  }

  const handleUsernameInput = (e) => {
    console.log("usernameinput 변경시작")
    setUsername(e.target.value);
    validateUsername(e.target.value);
    console.log("usernameinput 변경끝")
  }

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  }

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"});
    if(valid.name && valid.password && valid.email) {
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
    } else {
      console.log("유효성 검사 통과실패");
      dispatch({type:"UPDATE_FAILURE"});
    }
  };

  console.log("before return",valid.name,errors);
  return (
    <div className="settings">
        {/* <Sidebar /> */}
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
              <input type="text" placeholder={user.username} onChange={handleUsernameInput}/>
              <span className="settings-error">{errors["name"]}</span>
              <label htmlFor="">이메일</label>
              <input type="email" placeholder={user.email} onChange={handleEmailInput}/>
              <span className="settings-error">{errors["email"]}</span>
              <label htmlFor="">비밀번호</label>
              <input type="password" onChange={handlePasswordInput}/>
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
