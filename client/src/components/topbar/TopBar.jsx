import React, { useContext } from "react"
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.scss"
import userIcon from "../../img/icon-user.png"

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
                                        <Link to="/settings">
                                            <img 
                                                className="top-img" 
                                                src={user.profileImg ? PF +user.profileImg : userIcon }
                                                alt="내 프로필 이미지" 
                                            />
                                        </Link>
                                        <ul className="personal-menu">
                                            <li className="personal-menu-item"><Link to={`/?user=${user.username}`} className="link">내 블로그</Link></li>
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
                                            <Link to="/login" className="link">로그인</Link>
                                        </li>
                                        <li className="top-right-item">
                                            <Link to="/register" className="link">회원가입</Link>
                                        </li>
                                    </ul>
                                )
                            }
                        </div>
                </div>
                <input id="toggle-checker" className="top-mobile-toggle-checker" type="checkbox" />
                <div className="top-mobile-nav">
                    <div className="top-mobile-menu">
                        <label className="top-mobile-toggle-label" htmlFor="toggle-checker">
                            <i className="top-mobile-icon fa-solid fa-bars"></i>
                        </label>
                        
                    </div>
                    <div className="top-mobile-logo"><strong>&#123;  &#125;</strong></div>
                    <div className="top-mobile-write">
                        <Link to="/write" className="top-mobile-write-link">글 쓰기</Link>
                    </div>
                </div>
                <div className="top-mobile-cont">
                    <ul className="top-mobile-list">
                        <li className="top-mobile-item-search">
                            <form className="top-mobile-search-form">
                                <i className="top-mobile-search-icon fas fa-search"></i>
                                <input className="top-mobile-search-input" type="text" placeholder="검색" />
                            </form>
                        </li>
                        <li className="top-mobile-item-profile">
                            <div className="top-mobile-profile">
                                <img className="top-mobile-profile-img" src={PF + user.profileImg} alt={`${user.username}의 프로필사진`} />
                                <span className="top-mobile-profile-name">{user.username}</span>
                                <p className="top-mobile-profile-bio">{user.biography}</p>
                            </div>
                        </li>
                        <li className="top-mobile-item"><Link to="/" className="top-mobile-item-link">홈</Link></li>
                        <li className="top-mobile-item"><Link to={`/?user=${user.username}`} className="top-mobile-item-link">내 블로그</Link></li>
                        <li className="top-mobile-item"><Link to="/settings" className="top-mobile-item-link">내 정보</Link></li>
                        <li className="top-mobile-item">{ user && <Link to="/" className="top-mobile-item-link" onClick={handleLogout}>로그아웃</Link> }</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
