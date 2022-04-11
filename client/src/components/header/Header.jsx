import React from "react"
import "./header.scss"

export default function Header() {
  return (
    <div className="header">
        <div className="header-pinned">
          <img src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80" alt="타이틀이미지" className="header-img" />
          <div className="curtain"></div>
          <div className="header-pinned-post">
            <div className="header-titles">
                <span className="header-title-small">Cover Stroy</span>
                <span className="header-title-large">치킨은 맛있다</span>
            </div>
            <div className="header-desc">
              아무리 생각해봐도 치킨은 너무 맛있는게 아닌가? 그런 당연한 생각에 의문이 들때가 있다, 내가 먹은 치킨이 나중에 지옥에서 돌아와 복수 할 것이라는 막연한 불안감 속에, 나는 오늘도 떨리는 손으로 vscode를 켠다.
              그 순간, 뒤에서 차갑게 식은 치킨뼈의 싸늘함이 느껴졌다. 그렇다. 돌아온 것이다. 그들이... 결제하고 더 보기
            </div>
          </div>
        </div>
    </div>
  )
}
