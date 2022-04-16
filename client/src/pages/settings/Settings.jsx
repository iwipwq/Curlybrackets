import axios from "axios";
import { useContext, useState, useEffect, useRef } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import { Context } from "../../context/Context"
import "./settings.scss"
import userIcon from "../../img/icon-user.png"

export default function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio,setBio] = useState("")
  const [errors,setErrors] = useState({name:"",email:"",password:"",bio:""});
  const [valid,setValid] = useState({name:false,email:false,password:false,bio:true});
  const [checkStatus,setCheckStatus] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const passwordRef = useRef();

  const PF = "http://localhost:5000/images/"
  if(user.profileImg) {
    console.log("image yesyse")
  } else if (!user.profileImg) {
    console.log("image nono")
  }

  const setResults = (target,boolean,message) => {
    setValid((prev)=>({...prev, [target]:boolean}));
    setErrors((prev)=>({...prev, [target]:message}));
  }

  const validateUsername = (username) => {
    const isLengthValid = /^[A-Za-z\d@$!%*?&]{1,12}$/.test(username);
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

  const validatePassword = (password) => {
    const islengthValid = /^[A-Za-z\d@$!%*?&]{3,20}$/.test(password);
    const atLeastOneUpperAndLowercaseLetter = /^(?=.*[a-z])(?=.*[A-Z]).*$/.test(password);
    const atLeastOneNumber = /^(?=.*\d).*$/.test(password);
    const atLeastOneSpecialCharacter = /^(?=.*[@$!%*?&]).*$/.test(password);
    switch (false) {
      case islengthValid:
        setResults("password",false,"비밀번호는 3자 이상 20자 이하만 가능합니다.")
        break;
      
      case atLeastOneUpperAndLowercaseLetter:
        setResults("password",false,"영문 소문자,대문자가 각각 1개 이상 포함되어야 합니다.")
        break;
      
      case atLeastOneNumber:
        setResults("password",false,"숫자가 1개 이상 포함되어야 합니다.")
        break;
      
      case atLeastOneSpecialCharacter:
        setResults("password",false,"특수문자가 1개 이상 포함되어야 합니다.")
        break;
    
      default:
        setResults("password",true,"사용가능한 비밀번호입니다.")
        break;
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
    setUsername(e.target.value);
    validateUsername(e.target.value);
  }

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  }

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  }

  const handleBioInput = (e) => {
    setBio(e.target.value);
    validateBio(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"});
    if(valid.name && valid.password && valid.email && valid.bio) {
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

  const handleCheckbox = () => {
    setCheckStatus(!checkStatus);
  }

  const handleWithdrawal = async (e) => {
    e.preventDefault();
    if(checkStatus) {
      try {
        const res = await axios.delete(`http://localhost:5000/api/user/${user._id}`, { 
            password: passwordRef.current.value,
          })
        console.log(res.data);
        alert("계정이 정상적으로 삭제되었습니다.");
        window.location.replace("http://localhost:3000/");
      } catch(err) {
        console.log(err.response.data);
      } 
    } else {
      alert("주의사항을 읽어보시고 체크해주세요!")
    }
}

  console.log("before return",valid,valid.name,valid.email,valid.password,errors,"자기소개길이",bio.length);
  console.log("동의여부",checkStatus);
  return (
    <div className="settings">
        <Sidebar />
        <div className="settings-wrapper">
          <div className="settings-title">
            <span className="settings-update-title">내 정보 수정하기</span>
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
              <label htmlFor="">사용자 이름<span>특수문자 제외, 12자 이하의 한글,영문,숫자 조합</span></label>
              <input type="text" placeholder={user.username} onChange={handleUsernameInput}/>
              <span className="settings-error" style={valid.name ? {color:"green"} : {color:"red"}}>{errors["name"]}</span>
              <label htmlFor="">이메일</label>
              <input type="email" placeholder={user.email} onChange={handleEmailInput}/>
              <span className="settings-error" style={valid.email ? {color:"green"} : {color:"red"}}>{errors["email"]}</span>
              <label htmlFor="">비밀번호</label>
              <input type="password" onChange={handlePasswordInput}/>
              <span className="settings-error" style={valid.password ? {color:"green"} : {color:"red"}}>{errors["password"]}</span>
              <label htmlFor="settings-bio">자기소개</label>
              <span className="settings-error" style={valid.bio ? {color:"green"} : {color:"red"}}>{errors["bio"]}</span>
              <textarea onChange={handleBioInput} cols="30" rows="10" className="settings-bio"></textarea>
            </div>
            <button className="settings-submit" type="submit" disabled={ valid.name && valid.password && valid.email && valid.bio ? false : true }>수정하기</button>
          </form>
          { success && <span style={{color:"green"}}>프로필이 정상적으로 업로드되었습니다.</span>}
          <hr />
          <section className="settings-danger-zone">
            <h2 className="settings-withdrawal-title">회원탈퇴</h2>
            <form className="settings-withdrawal-form" onSubmit={handleWithdrawal}>
              <span className="settings-withdrawal-caution">주의 : 회원 탈퇴시, 회원정보와 모든 포스트가 즉시 삭제됩니다.</span>
              <label htmlFor="settings-delete-consent" className="settings-withdrawal-label">
                <input type="checkbox" id="settings-delete-consent" checked={checkStatus} onChange={handleCheckbox} value="동의여부"/>
                위 사항을 확인했습니다.
              </label>
              <input type="password" className="settings-withdrawal-password" ref={passwordRef}/>
              <button className="settings-withdrawal-button" type="submit">회원 탈퇴하기</button>
            </form>
          </section>
        </div>
    </div>
  )
}
