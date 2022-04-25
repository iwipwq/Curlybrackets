import React, { useContext, useState } from "react"
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.scss"
import userIcon from "../../img/icon-user.png"

export default function TopBar() {
    const { user, dispatch } = useContext(Context);
    const [isNavToggle, setIsNavToggle] = useState(false);
    const PF = "http://localhost:5000/images/";

    const handleCheckbox = () => {
        setIsNavToggle(prev => !prev)
    }

    const handleToggleNav = () => {
        setIsNavToggle(false);
    }

    const handleLogout = (e) => {
        dispatch({ type:"LOGOUT" });
        setIsNavToggle(false);
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
                <input id="toggle-checker" className="top-mobile-toggle-checker" type="checkbox" checked={isNavToggle} onChange={handleCheckbox}/>
                <div className="top-mobile-nav">
                    <div className="top-mobile-menu">
                        <label className="top-mobile-toggle-label" htmlFor="toggle-checker">
                            <i className="top-mobile-icon fa-solid fa-bars"></i>
                        </label>
                        
                    </div>
                    <div className="top-mobile-logo"><strong>&#123;  &#125;</strong></div>
                    <div className="top-mobile-write">
                        <Link to={user ? "/write" : "/register"} className="top-mobile-write-link">{user ? "글 쓰기" : "회원가입"}</Link>
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
                                <img className="top-mobile-profile-img" src={user?.profileImg ? PF +user.profileImg : userIcon } alt={ user?.username ? `${user.username}의 프로필사진` : "기본 프로필 사진"} />
                                <span className="top-mobile-profile-name">{user ? user.username : "로그인 해주세요"}</span>
                                <p className="top-mobile-profile-bio">{user ? user.biography : null}</p>
                            </div>
                        </li>
                        <li className="top-mobile-item"><Link to="/" onClick={handleToggleNav} className="top-mobile-item-link">홈</Link></li>
                        {user ? <>
                            <li className="top-mobile-item"><Link to={`/?user=${user.username}`} onClick={handleToggleNav} className="top-mobile-item-link">내 블로그</Link></li>
                            <li className="top-mobile-item"><Link to="/settings" onClick={handleToggleNav} className="top-mobile-item-link">내 정보</Link></li>
                            <li className="top-mobile-item"><Link to="/" className="top-mobile-item-link" onClick={handleLogout}>로그아웃</Link></li>
                        </>
                        : <>
                            <li className="top-mobile-item"><Link to="/login" onClick={handleToggleNav} className="top-mobile-item-link">로그인</Link></li>
                            <li className="top-mobile-item"><Link to="/register" onClick={handleToggleNav} className="top-mobile-item-link">회원가입</Link></li>
                        </>}
                    </ul>
                </div>
            </div>
        </div>
    )
}
