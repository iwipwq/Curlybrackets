import { axiosInstance } from "../../config";
import { useContext, useState, useEffect, useRef } from "react"
import { Context } from "../../context/Context"
import "./delete-account.scss"

export default function DeleteAccount() {
  const { user, dispatch } = useContext(Context);
  const passwordRef = useRef();
  const [checkStatus, setCheckStatus] = useState(false);
  const handleCheckbox = () => {
    setCheckStatus(!checkStatus);
  }
  
  const handleWithdrawal = async (e) => {
    e.preventDefault();
    console.log("start withdrawal submit")
    if(checkStatus) {
      // dispatch({type:"WITHDRAWAL_START"})
      try {
        console.log("trying withdrawal")
        const res = await axiosInstance.delete(`/user/${user._id}`, {
            data: {
              userId: user._id,
              password: passwordRef.current.value,
            }
          })
        console.log(res.data);
        alert("계정이 정상적으로 삭제되었습니다.");
        dispatch({type:"WITHDRAWAL_SUCCESS"})
      } catch(err) {
        console.log(err.response.data);
        // dispatch({type:"WITHDRAWAL_FAILURE"})
      } 
    } else {
      alert("주의사항을 읽어보시고 체크해주세요!")
    }
  }

  console.log("동의여부",checkStatus);
  return (
    <section className="settings-danger-zone">
      <h2 className="settings-withdrawal-title">회원탈퇴</h2>
      <p>주의사항을 읽어보신 후 확인란에 체크해주시면 회원탈퇴를 진행합니다.</p>
      <strong className="settings-withdrawal-caution">주의 : 회원 탈퇴시, 회원정보와 모든 포스트가 즉시 삭제됩니다.</strong>
      <label htmlFor="settings-delete-consent" className="delete-consent-label">
        <input type="checkbox" id="settings-delete-consent" className="settings-delete-consent" checked={checkStatus} onChange={handleCheckbox} value="동의여부"/>
        위 사항을 확인했으며, 회원탈퇴를 진행하겠습니다.
      </label>
      <form className="settings-withdrawal-form" onSubmit={handleWithdrawal} style={checkStatus ? {display:"block"} : {display:"none"}}>
      <label htmlFor="withdrawal-password" className="withdrawal-password-label">본인확인을 위해 비밀번호를 입력해 주세요.</label>
      <input id="confirm-password" placeholder="비밀번호를 입력해주세요." type="password" className="settings-withdrawal-password" ref={passwordRef}/>
      <button className="settings-withdrawal-button" type="submit" >회원 탈퇴</button>
      </form>
    </section>
  )
}
