import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Context } from '../../context/Context';
import "./password.scss";

export default function Password() {
  const { user, isFetching, dispatch } = useContext(Context);
  const [prevPassword,setPrevPassword] = useState("");
  const [password, setPassword] = useState("");
  const [errors,setErrors] = useState({name:"",email:"",password:"",bio:""});
  const [valid,setValid] = useState({name:true,email:true,password:false,bio:true});
  const [success, setSuccess] = useState(false);
  const setResults = (target,boolean,message) => {
    setValid((prev)=>({...prev, [target]:boolean}));
    setErrors((prev)=>({...prev, [target]:message}));
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
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  }

  const handleSubmitOldPassword = async (e) => {
    dispatch({ type:"LOGIN_START" });
    try {
      console.log(isFetching,"try안의 isFetching");
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: user.username,
        password: prevPassword,
      })
      console.dir(res);
      dispatch({ type:"LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      console.log(err.response.data);
      dispatch({ type:"LOGIN_FAILURE" })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"});
    if(valid.password) {
      const updatedUser = {
        userId: user._id,
        password,
      };
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
    <div>
      <h1 style={{fontSize:"200px"}}>Password</h1>
      <form>
        <label htmlFor="password-old"></label>
        <input id="password-old" type="password" onChange={(e) => setPrevPassword(e.target.value)} />
        <label htmlFor="password-new">비밀번호<span>(특수문자, 영문 소/대문자, 숫자를 각각 1개이상 포함한 8자이상 20자 이하의 조합문자)</span></label>
        <input id="password-new" type="password" onChange={handlePasswordInput}/>
        <span className="settings-error" style={valid.password ? {color:"green"} : {color:"red"}}>{errors["password"]}</span>
      </form>
      { success && <span style={{color:"green"}}>비밀번호가 정상적으로 변경되었습니다.</span>}
    </div>
  )
}
