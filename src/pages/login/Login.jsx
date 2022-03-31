import "./login.scss"

export default function Login() {
  return (
    <div className="login">
        <span className="login-title">환영합니다.</span>
        <form className="login-form">
            <label>Email</label>
            <input type="text" placeholder="이메일을 입력해주세요 ..." className="login-input" />
            <label>Password</label>
            <input type="password" placeholder="비밀번호를 입력해주세요 ..." className="login-input"/>
            <button className="login-button">로그인</button>
        </form>
        <button className="login-register-button">
            <Link to="/register" className="link">회원가입</Link>
        </button>
    </div>
  )
}
