import "./register.scss"
import { Link } from "react-router-dom"
import { useState } from "react"
import { axiosInstance } from "../../config";

export default function Register() {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [errors,setErrors] = useState({name:"",email:"",password:"",bio:"",server:""});
  const [valid,setValid] = useState({name:false,email:false,password:false,bio:true});
  const [overlapped,setOverlapped] = useState({name:[],email:[]});

  const setResults = (target,boolean,message) => {
    setValid((prev)=>({...prev, [target]:boolean}));
    setErrors((prev)=>({...prev, [target]:message}));
  }

  const validateUsername = (username) => {
    const isLengthValid = /^[A-Za-z\d@$!%*?&]{1,12}$/.test(username);
    const isLetterValid = /^[a-zA-Z\u3131-\u318E\uAC00-\uD7A3\d]*$/.test(username);
    const isOverlapped = !overlapped.name.find(overlappedItem => overlappedItem === username);
    switch (false) {
      case isLengthValid:
        setResults("name",false,"이름은 1자 이상 12자 이하로 해주세요")
        break;

      case isLetterValid:
        setResults("name",false,"이름은 한글,영문,숫자조합만 사용가능합니다.")
        break;
      
      case isOverlapped:
        setResults("name",false,"중복된 이름입니다. 다른이름을 사용해주세요.")
        break;
      
      default:
        setResults("name",true,"사용가능한 이름입니다.")
        break;
    }
  }

  const validateEmail = (email) => {
    const isEmailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    const isOverlapped = !overlapped.email.find(overlappedItem => overlappedItem === email);
    switch (false) {
      case isEmailFormat:
        setResults("email",false,"이메일 형식으로 입력해주세요")
        break;
      
      case isOverlapped:
        setResults("email",false,"중복된 이메일입니다. 다른 이메일을 사용해주세요.")
        break;

      default:
        setResults("email",true,"사용가능한 이메일형식입니다.")
        break;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(valid.name && valid.password && valid.email && valid.bio) {
        try {
        const res = await axiosInstance.post("/auth/register", {
          username,
          email,
          password,
        });
        res.data && window.location.replace("/login");
      } catch (err) {
        const usernameOverlap = err.response.data.keyPattern.username;
        const emailOverlap = err.response.data.keyPattern.email;
        if(usernameOverlap) {
          setOverlapped((prev)=>({...prev, name:[...prev.name, username]}));
          setValid((prev)=>({...prev, name:false}))
          setErrors((prev)=>({...prev, name:"중복된 이름입니다. 다른이름을 선택해주세요.", server:"이미 가입된 계정입니다. 다시한번 확인해주세요."}));
        } else if(emailOverlap) {
          setOverlapped((prev)=>({...prev, email:[...prev.email, email]}));
          setValid((prev)=>({...prev, email:false}))
          setErrors((prev)=>({...prev, email:"중복된 이메일입니다. 다른 이메일을 사용해주세요.", server:"이미 가입된 계정입니다. 다시한번 확인해주세요."}));
        } else {
          setErrors((prev)=>({...prev, server:"죄송합니다, 서버에 문제가 생겼습니다. 잠시 후 다시 시도해주세요"}));
        }
      };
    } else {
      setErrors((prev)=>({...prev, server:"유효하지 않은 양식입니다. 양식을 다시 한번 확인해주세요"}));
    }
  }
  return (
    <div className="register">
        <article className="register-wrapper">
          <span className="register-title">회원가입</span>
          <form className="register-form" onSubmit={handleSubmit}>
              <label>이름
              </label>
              <span className="register-error-message" style={valid.name ? {color:"green"} : {color:"red"}}>{errors.name}</span>
              <input 
                type="text" 
                placeholder="이름을 입력해주세요 ..." 
                className="register-input" 
                onChange={handleUsernameInput}
              />
              <ul className="register-help-list">
                <li className="register-help-item">다른 사람들에게 보여줄 이름입니다.</li>
                <li className="register-help-item">1자 이상 12자 이하로 정해주세요.</li>
                <li className="register-help-item">이름은 한글,영문,숫자 조합만 가능합니다.</li>
              </ul>
              <label>이메일
              </label>
              <span className="register-error-message" style={valid.email ? {color:"green"} : {color:"red"}}>{errors.email}</span>
              <input 
                type="text" 
                placeholder="이메일을 입력해주세요 ..." 
                className="register-input" 
                onChange={handleEmailInput}
              />                 
              <ul className="register-help-list">
                <li className="register-help-item">소식을 받고, 소셜에 나타낼 이메일을 작성해주세요.</li>
                <li className="register-help-item">이메일 형식으로 작성해주세요.</li>
              </ul>                
              <label>비밀번호</label>
              <span className="register-error-message" style={valid.password ? {color:"green"} : {color:"red"}}>{errors.password}</span>
              <input 
                type="password" 
                placeholder="비밀번호를 입력해주세요 ..." 
                className="register-input"
                onChange={handlePasswordInput}
                />
              <ul className="register-help-list">
                <li className="register-help-item">특수문자와 숫자를 반드시 하나 포함시켜주세요.</li>
                <li className="register-help-item">영문 소/대문자가 하나이상 들어가 있어야 합니다.</li>
                <li className="register-help-item">8자 이상 20자 이하로 정해주세요.</li>
              </ul>
              <button type="submit" className="register-button">회원가입</button>
          </form>
          {errors.server && <span className="register-server-message" style={{color:"red"}}>{errors.server}</span>}
          <span className="register-login">
              이미 회원이신가요? <Link to="/login" className="link">로그인</Link> 하러가기
          </span>
        </article>
    </div>
  )
}
