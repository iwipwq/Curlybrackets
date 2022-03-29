import React from "react"
import "./topbar.scss"

export default function TopBar() {
  return (
    <div className="top">
        <div className="top-left">
            <i className="top-icon fa-brands fa-github-square"></i>
            <i className="top-icon fa-brands fa-instagram-square"></i>
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
            <img className="top-img" src="" alt="내 프로필 이미지" />
            <i className="top-search-icon fas fa-search"></i>
        </div>
    </div>
  )
}
