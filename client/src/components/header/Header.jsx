import React from "react"
import "./header.scss"

export default function Header() {
  return (
    <div className="header">
        {/* <div className="header-titles">
            <span className="header-title-small">React & Node</span>
            <span className="header-title-large">Blog</span>
        </div> */}
        <img src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80" alt="타이틀이미지" className="header-img" />
    </div>
  )
}
