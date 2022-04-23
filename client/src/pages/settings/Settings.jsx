import { useContext, useEffect, useState } from "react"
import { Context } from "../../context/Context"
import "./settings.scss"
import SettingsNav from "../../components/sidebar/settings/SettingsNav";
import userIcon from "../../img/icon-user.png"

export default function Settings() {
  const { user, path } = useContext(Context);
  const DEFAULT_IMG_URL = "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80"
  // const [ text, setText ] = useState({desc:"",guide:""})
  const PF = "http://localhost:5000/images/"

  return (
    <div className="settings">
      <header className="settings-header">
        <h2 className="settings-header-title"></h2>
        <img className="settings-header-background" src={user.profileImg ? PF + user.profileImg : DEFAULT_IMG_URL} alt={user.username + "의 프로필사진"} />
        <div className="settings-header-profile">
          <img className="settings-header-img" src={user.profileImg ? PF + user.profileImg : userIcon} alt={user.username + "의 프로필사진"} />
          <div className="settings-header-desc">
            <p className="settings-header-username">{user.username} 님 / {path?.heading} </p>
            <p className="settings-header-guide">{path?.title}</p>
          </div>
        </div>
      </header>
      <SettingsNav />
      { path?.component }
    </div>
  )
}
