import axios from "axios";
import { useContext, useState, useEffect, useRef } from "react"
import { Context } from "../../context/Context"
import "./profile.scss"
import userIcon from "../../img/icon-user.png"

export default function Profiles() {
  const { user, dispatch } = useContext(Context);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [bio,setBio] = useState(user.biography);
  const [errors,setErrors] = useState({name:"",email:"",bio:""});
  const [valid,setValid] = useState({name:true,email:true,bio:true});
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const PF = "http://localhost:5000/images/"

  const setResults = (target,boolean,message) => {
    setValid((prev)=>({...prev, [target]:boolean}));
    setErrors((prev)=>({...prev, [target]:message}));
  }

  const validateUsername = (username) => {
    const isLengthValid = /^[A-Za-z\u3131-\u318E\uAC00-\uD7A3\d@$!%*?&]{1,12}$/.test(username);
    const isLetterValid = /^[a-zA-Z\u3131-\u318E\uAC00-\uD7A3\d]*$/.test(username);
    switch (false) {
      case isLengthValid:
        setResults("name",false,"이름은 1자 이상 12자 이하로 해주세요")
        break;

      case isLetterValid:
        setResults("name",false,"이름은 한글,영문,숫자조합만 사용가능합니다.")
        break;
    
      default:
        setResults("name",true,"사용가능한 이름입니다.")
        break;
    }
  }

  const validateEmail = (email) => {
    const isEmailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    if(isEmailFormat) {
      setResults("email",true,"사용가능한 이메일형식입니다.")
    } else {
      setResults("email",false,"이메일 형식으로 입력해주세요")
    }
  }

  const validateBio = (bio) => {
    if(bio.length <= 200) {
      setResults("bio",true,"")
    } else {
      setResults("bio",false,"자기소개는 200자 이하로 작성해주세요")
    }
  }

  const handleUsernameInput = (e) => {
    if(!e.target.value) {
      setUsername(user.username);
      setResults("name",true,"");
      return;
    }
    setUsername(e.target.value);
    validateUsername(e.target.value);
  }

  const handleEmailInput = (e) => {
    if(!e.target.value) {
      setEmail(user.email);
      setResults("email",true,"");
      return;
    }
    setEmail(e.target.value);
    validateEmail(e.target.value);
  }

  const handleBioInput = (e) => {
    if(!e.target.value) {
      setBio(user.biography);
      setResults("bio",true,"");
      return;
    }
    setBio(e.target.value);
    validateBio(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"});
    if(valid.name && valid.email && valid.bio) {
      const updatedUser = {
        userId: user._id,
        username,
        email,
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

  return (
    <div className="settings-wrapper">
      <div className="settings-title">
        <span className="settings-update-title">프로필 수정하기</span>
      </div>
      <form className="settings-form" onSubmit={handleSubmit}>
        <label htmlFor="">프로필 사진</label>
        <div className="settings-profile-img">
          <div className="settings-profile-img-wrapper">
            <img src={file ? URL.createObjectURL(file) : !user.profileImg ? userIcon : PF + user.profileImg} alt="프로필 이미지" />
            <label htmlFor="file-input">
                <i className="settings-profile-img-icon fa-solid fa-arrow-up-from-bracket"></i>
            </label>
          </div>
          <input type="file" id="file-input" style={{display:"none"}} onChange={(e) => {setFile(e.target.files[0])}}/>
        </div>
        <div className="settings-profile-wrap">
          <label htmlFor="">사용자 이름<span>(특수문자 제외, 12자 이하의 한글,영문,숫자 조합)</span></label>
          <input type="text" placeholder={user.username} onChange={handleUsernameInput}/>
          <span className="settings-error" style={valid.name ? {color:"green"} : {color:"red"}}>{errors["name"]}</span>
          <label htmlFor="">이메일<span>(이메일 형식으로 입력해주세요)</span></label>
          <input type="email" placeholder={user.email} onChange={handleEmailInput}/>
          <span className="settings-error" style={valid.email ? {color:"green"} : {color:"red"}}>{errors["email"]}</span>
          <label htmlFor="settings-bio">자기소개</label>
          <span className="settings-error" style={valid.bio ? {color:"green"} : {color:"red"}}>{errors["bio"]}</span>
        </div>
        <textarea onChange={handleBioInput} cols="30" rows="10" className="settings-bio" defaultValue={user.biography}></textarea>
        <button className="settings-submit" type="submit" disabled={ valid.name && valid.email && valid.bio ? false : true }>수정하기</button>
      </form>
      { success && <span style={{color:"green"}}>프로필이 정상적으로 업로드되었습니다.</span>}
    </div>
  )
}
