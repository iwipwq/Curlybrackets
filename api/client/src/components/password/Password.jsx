import React, { useContext, useState } from "react"
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";
import "./password.scss";

export default function Password() {
  const { user, isFetching, error, dispatch } = useContext(Context);
  const [prevPassword,setPrevPassword] = useState("");
  const [password, setPassword] = useState("");
  const [errors,setErrors] = useState({password:"(특수문자, 영문 소/대문자, 숫자를 각각 1개이상 포함한 8자이상 20자 이하의 조합문자)"});
  const [valid,setValid] = useState({password:false});
  const [oldPasswordValid, setOldPasswordValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState("")
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

  const CheckOldPassword = async () => {
    try {
      console.log(isFetching,"try안의 isFetching");
      const res = await axiosInstance.post("/auth/login", {
        username: user.username,
        password: prevPassword,
      })
      console.dir(res);
      setOldPasswordValid(true);
    } catch (err) {
      console.log(err.response.data,"순서1");
      // setFailure(err.response.data);
      setOldPasswordValid(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"});
    CheckOldPassword();
    if(valid.password && oldPasswordValid) {
      const updatedUser = {
        userId: user._id,
        password,
      };
      try {
        const res = await axiosInstance.put(`/user/${user._id}`, updatedUser);
        setSuccess(true);
        dispatch({type:"UPDATE_SUCCESS", payload: res.data });
      } catch (err) {
        console.dir(err,"서버업로드중에러");
        setFailure(err.response.data);
        dispatch({type:"UPDATE_FAILURE"});
      }
    } else {
      console.log("유효성 검사 통과실패");
      if(!valid.password) {
        setFailure("올바르지 않은 형식의 비밀번호입니다. 입력 항목을 다시 체크해주세요")
      } else {
        console.log("순서2")
        setFailure("본인확인을 위한 비밀번호가 기존 비밀번호와 일치하지 않습니다.")
      }
      dispatch({type:"UPDATE_FAILURE"});
    }
  };

  return (
    <section className="password-section">
      <h2 className="password-section-title">비밀번호 변경하기</h2>
      <form className="password-form" onSubmit={handleSubmit}>
        <label className="password-old-label" htmlFor="password-old-input">본인확인을 위해 <strong>기존 비밀번호</strong>를 입력해주세요.</label>
        <input id="password-old" className="password-old-input" type="password" onChange={(e) => setPrevPassword(e.target.value)} />
        <label className="password-new-label" htmlFor="password-new-input"><strong>새 비밀번호</strong></label>
        <input id="password-new" className="password-new-input" type="password" onChange={handlePasswordInput}/>
        <span className="password-error" style={valid.password ? {color:"green"} : {color:"red"}}>{errors["password"]}</span>
        <button className="password-submit" type="submit">변경하기</button>
      </form>
      { success && <span style={{color:"green",fontSize:"1.4em"}}>비밀번호가 정상적으로 변경되었습니다.</span>}
      { error && <span style={{color:"red",fontSize:"1.4em"}}>오류: {failure}</span>}
    </section>
  )
}
