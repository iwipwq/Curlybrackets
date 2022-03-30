import React from "react"
import "./topbar.scss"

export default function TopBar() {
  return (
    <div className="top-group">
        <div className="top-wrapper">
           <div className="top">
                <div className="top-left">
                    <strong className="top-logo">&#123; NEST &#125;</strong>
                </div>
                <div className="top-center">
                    <ul className="top-list">
                        <li className="top-list-item">HOME</li>
                        <li className="top-list-item">ABOUT</li>
                        <li className="top-list-item">CONTACT</li>
                        <li className="top-list-item">WRITE</li>
                        <li className="top-list-item">LOGOUT</li>
                    </ul>
                </div>
                <div className="top-right">
                    <img className="top-img" src="https://images.unsplash.com/photo-1648293788404-0adf71448569?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" alt="내 프로필 이미지" />
                    <i className="top-search-icon fas fa-search"></i>
                </div>
           </div>
        </div>
    </div>
  )
}
