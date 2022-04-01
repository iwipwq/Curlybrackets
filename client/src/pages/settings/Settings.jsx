import Sidebar from "../../components/sidebar/Sidebar"
import "./settings.scss"

export default function Settings() {
  return (
    <div className="settings">
        <Sidebar />
        <div className="settings-wrapper">
          <div className="settings-title">
            <span className="settings-update-title">내 정보 수정하기</span>
            <span className="settings-delete-title">계정 삭제하기</span>
          </div>
          <form className="settings-form">
            <label htmlFor="">프로필 사진</label>
            <div className="settings-profile-img">
              <img src="https://images.unsplash.com/photo-1453738773917-9c3eff1db985?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="프로필 이미지" />
              <label htmlFor="file-input">
                <i class="settings-profile-img-icon fa-solid fa-circle-user"></i>
              </label>
              <input type="file" id="file-input" style={{display:"none"}} />
            </div>
            <label htmlFor="">사용자 이름</label>
            <input type="text" placeholder="이름을 입력해주세요"/>
            <label htmlFor="">이메일</label>
            <input type="email" placeholder="user@email.com"/>
            <label htmlFor="">비밀번호</label>
            <input type="password" />
            <button className="settings-submit">수정하기</button>
          </form>
        </div>
    </div>
  )
}
