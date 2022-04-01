import "./register.scss"
import { Link } from "react-router-dom"

export default function Register() {
  return (
    <div className="register">
        <span className="register-title">환영합니다.</span>
        <form className="register-form">
            <label>User name</label>
            <input type="text" placeholder="이름을 입력해주세요 ..." className="register-input" />
            <label>Email</label>
            <input type="text" placeholder="이메일을 입력해주세요 ..." className="register-input" />
            <label>Password</label>
            <input type="password" placeholder="비밀번호를 입력해주세요 ..." className="register-input"/>
            <button className="register-button">회원가입</button>
        </form>
        <button className="register-login-button">
            <Link to="/login" className="link">로그인</Link>
        </button>
    </div>
  )
}
