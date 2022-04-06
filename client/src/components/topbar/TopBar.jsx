import React from "react"
import { Link } from "react-router-dom";
import "./topbar.scss"

export default function TopBar() {
    const user = false;
    return (
        <div className="top-group">
            <div className="top-wrapper">
            <div className="top">
                    <div className="top-left">
                        <strong className="top-logo">&#123; NEST &#125;</strong>
                    </div>
                    <div className="top-center">
                        <ul className="top-list">
                            <li className="top-list-item"><Link to="/" className="link">HOME</Link></li>
                            <li className="top-list-item"><Link to="/about" className="link">ABOUT</Link></li>
                            <li className="top-list-item"><Link to="/contact" className="link">CONTACT</Link></li>
                            <li className="top-list-item"><Link to="/write" className="link">WRITE</Link></li>
                            <li className="top-list-item"> { user && <Link to="/" className="link">LOGOUT</Link> }</li>
                        </ul>
                    </div>
                    <div className="top-right">
                        { 
                            user ? 
                            (<img className="top-img" src="https://images.unsplash.com/photo-1648293788404-0adf71448569?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" alt="내 프로필 이미지" />)
                            : (
                                <ul className="top-list">
                                    <li className="top-list-item">
                                        <Link to="/login" className="link">LOGIN</Link>
                                    </li>
                                    <li className="top-list-item">
                                        <Link to="/register" className="link">REGISTER</Link>
                                    </li>
                                </ul>
                            )
                        }
                        <i className="top-search-icon fas fa-search"></i>
                    </div>
            </div>
            </div>
        </div>
    )
}
