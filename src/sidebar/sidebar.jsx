import React from "react"
import "./sidebar.css"

export default function Sidebar() {
  return (
    <div className="sidebar">
        <div className="sidebar-item">
            <span className="sidebar-title">ABOUT ME</span>
            <img src="https://images.unsplash.com/photo-1648293788404-0adf71448569?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" alt="내 프로필 사진" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet atque ad dignissimos possimus distinctio sapiente a eveniet ex explicabo veniam, asperiores rem iure vel ut, ab consequuntur at quibusdam quos?</p>
        </div>
        <div className="sidebar-item">
            <span className="sidebar-title">CATEGORIES</span>
            <ul className="sidebar-list">
                <li className="sidebar-list-item">Life</li>
                <li className="sidebar-list-item">Music</li>
                <li className="sidebar-list-item">Style</li>
                <li className="sidebar-list-item">Sport</li>
                <li className="sidebar-list-item">Tech</li>
                <li className="sidebar-list-item">Cinema</li>
            </ul>
        </div>
        <div className="sidebar-item">
            <span className="sidebar-title">FOLLOW US</span>
            <ul className="sidebar-social">
                <i className="sidebar-icon fa-brands fa-github-square"></i>
                <i className="sidebar-icon fa-brands fa-instagram-square"></i>
            </ul>
        </div>
    </div>
  )
}

