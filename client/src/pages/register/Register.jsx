import "./register.scss"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios";

export default function Register() {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] =useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      console.log("회원가입시res",res);
      res.data && window.location.replace("/login");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }
  return (
    <div className="register">
        <span className="register-title">회원가입</span>
        <form className="register-form" onSubmit={handleSubmit}>
            <label>User name</label>
            <input 
              type="text" 
              placeholder="이름을 입력해주세요 ..." 
              className="register-input" 
              onChange={e => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input 
              type="text" 
              placeholder="이메일을 입력해주세요 ..." 
              className="register-input" 
              onChange={e => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input 
              type="password" 
              placeholder="비밀번호를 입력해주세요 ..." 
              className="register-input"
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit" className="register-button">회원가입</button>
        </form>
        <span className="register-login">
            이미 회원이신가요? <Link to="/login" className="link">로그인</Link> 하러가기
        </span>
        {error && <span style={{color:"red"}}>이미 가입된 회원입니다.</span>}
    </div>
  )
}
