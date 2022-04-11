import React, { useContext } from "react"
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.scss"

export default function TopBar() {
    const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:5000/images/";

    const handleLogout = () => {
        dispatch({ type:"LOGOUT" });
    }
    return (
        <div className="top-group">
            <div className="top-wrapper">
            <div className="top">
                    <div className="top-left">
                        <Link to="/" className="link"><strong className="top-logo">&#123; NEST &#125;</strong></Link>
                    </div>
                    <div className="top-right">
                        <i className="top-search-icon fas fa-search"></i>
                        { user ? 
                            (
                            <ul className="top-right-list">
                                <li className="top-right-item"> 
                                    
                                </li>
                                <li className="top-right-item">
                                    <Link to="/settings">
                                        <img 
                                            className="top-img" 
                                            src={PF +user.profileImg}
                                            alt="내 프로필 이미지" 
                                        />
                                    </Link>
                                    <ul className="personal-menu">
                                        <li className="personal-menu-item">내 블로그</li>
                                        <li className="personal-menu-item"><Link to="/settings" className="link">내 정보</Link></li>
                                        <hr/>
                                        <li className="personal-menu-item-logout">
                                            { user && <Link to="/" className="link" onClick={handleLogout}>로그아웃</Link> }
                                        </li>
                                    </ul>
                                </li>
                                <li className="top-right-item"><Link to="/write" className="write-button">글 쓰기</Link></li>
                            </ul>
                            )
                            : (
                                <ul className="top-right-list">
                                    <li className="top-right-item">
                                        <Link to="/login" className="link">LOGIN</Link>
                                    </li>
                                    <li className="top-right-item">
                                        <Link to="/register" className="link">REGISTER</Link>
                                    </li>
                                </ul>
                            )
                        }
                    </div>
            </div>
            </div>
        </div>
    )
}
