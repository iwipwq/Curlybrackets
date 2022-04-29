import "./login.scss"
import { Link } from "react-router-dom"
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import { axiosInstance } from "../../config";

export default function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
  const [message,setMessage] = useState("")
  const { error, user, isFetching, dispatch  } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type:"LOGIN_START" });
    try {
      console.log(isFetching,"try안의 isFetching");
      const res = await axiosInstance.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      })
      dispatch({ type:"LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      setMessage(err.response.data);
      dispatch({ type:"LOGIN_FAILURE" })
    }
  }
  console.log(error,"error값",isFetching,"isFetching값",user,"user값");
  return (
    <div className="login">
        <div className="login-wrapper">
          <span className="login-title">환영합니다.</span>
          <form className="login-form" onSubmit={handleSubmit}>
              <label>username</label>
              <input ref={userRef} type="text" placeholder="이름을 입력해주세요 ..." className="login-input" />
              <label>Password</label>
              <input ref={passwordRef} type="password" placeholder="비밀번호를 입력해주세요 ..." className="login-input"/>
              <button type="submit" className="login-button" disabled={isFetching}>로그인</button>
          </form>
          {error && <span className="login-message">{message}</span> }
          <span className="login-register">
              아직 계정이 없으신가요? <Link to="/register" className="link">회원가입</Link> 하러가기
          </span>
        </div>
    </div>
  )
}
