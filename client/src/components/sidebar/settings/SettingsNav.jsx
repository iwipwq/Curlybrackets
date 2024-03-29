import React, { useContext, useEffect } from "react"
import { Context } from "../../../context/Context"
import DeleteAccount from "../../deleteAccount/DeleteAccount";
import Password from "../../password/Password";
import Profiles from "../../profiles/Profiles";
import SocialProfiles from "../../socialProfiles/SocialProfiles";
import "./settings-nav.scss"

export default function SettingsNav() {
  const { dispatch } = useContext(Context);
  const BUTTON_CLASSNAME = "settings-nav-button";

  useEffect(()=> {
    dispatch({
      type:"PATH_CHANGE",
      payload:{
        name:"profile", 
        component:<Profiles/>,
        title:"내 정보를 수정 할 수 있는 페이지입니다.",
        heading:"프로필 수정하기",
      }
    })
  },[])

  const handleOnClick = (e) => {
    const clickedElement = e.target;
    if (clickedElement.classList.contains(BUTTON_CLASSNAME)) {
      const navItems = e.currentTarget.children;
      Array.from(navItems).forEach(navItem => {
        const navButton = navItem.children[0]
        if(navButton) {
          navButton.classList.remove("current");
        }
      });
      clickedElement.classList.add("current");

      const sendContext = (elementToRender) => {
        dispatch({
          type:"PATH_CHANGE", 
          payload: {
            name:clickedElement.value, 
            component:elementToRender,
            title:clickedElement.title,
            heading:clickedElement.innerText,
          }
        })
      }

      switch (clickedElement.value) {
        case "profile":
          sendContext(<Profiles/>);
          break;

        case "password":
          sendContext(<Password/>);
          break;

        case "social":
          sendContext(<SocialProfiles/>);
          break;

        case "delete":
          sendContext(<DeleteAccount/>);
          break;
      
        default:
          break;
      }

    }
  }

  return (
    <aside className="settings-nav">
      <ul className="settings-nav-list" onClick={handleOnClick}>
        <li className="settings-nav-item"><button type="button" className={`${BUTTON_CLASSNAME} current`} value="profile" title="내 정보를 수정 할 수 있는 페이지입니다." >프로필 수정하기</button></li>
        <li className="settings-nav-item"><button type="button" className={BUTTON_CLASSNAME} value="password" title="비밀번호를 변경 할 수 있습니다.">비밀번호 변경</button></li>
        <li className="settings-nav-item"><button type="button" className={BUTTON_CLASSNAME} value="social" title="사용하시는 SNS주소를 프로필에 등록 할 수 있습니다.">SNS프로필 설정</button></li>
        <li className="settings-nav-separator"></li>
        <li className="settings-nav-item"><button type="button" className={`${BUTTON_CLASSNAME} caution`} value="delete" title="CurlyBracket 계정을 탈퇴 하실 수 있는 페이지입니다.">계정 삭제</button></li>
      </ul>
    </aside>
  )
}
