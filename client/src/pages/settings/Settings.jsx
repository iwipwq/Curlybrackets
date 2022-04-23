import { useContext, useEffect, useState } from "react"
import { Context } from "../../context/Context"
import "./settings.scss"
import SettingsNav from "../../components/sidebar/settings/SettingsNav";

export default function Settings() {
  const { user, path } = useContext(Context);
  // const [ text, setText ] = useState({desc:"",guide:""})
  const PF = "http://localhost:5000/images/"

  return (
    <div className="settings">
      <header className="settings-header">
        <h2 className="settings-header-title"></h2>
        <img className="settings-header-background" src={PF + user.profileImg} alt={user.username + "의 프로필사진"} />
        <div className="settings-header-profile">
          <img className="settings-header-img" src={PF + user.profileImg} alt={user.username + "의 프로필사진"} />
          <div className="settings-header-desc">
            <p className="settings-header-username">{user.username} 님 / {path.heading} </p>
            <p className="settings-header-guide">{path.title}</p>
          </div>
        </div>
      </header>
      <SettingsNav />
      { path.component }
    </div>
  )
}
