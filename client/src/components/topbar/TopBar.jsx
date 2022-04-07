import React, { useContext } from "react"
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.scss"

export default function TopBar() {
    const { user, dispatch } = useContext(Context);

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
                    <div className="top-center">
                        <ul className="top-list">
                            <li className="top-list-item"><Link to="/" className="link">HOME</Link></li>
                            <li className="top-list-item"><Link to="/about" className="link">ABOUT</Link></li>
                            <li className="top-list-item"><Link to="/contact" className="link">CONTACT</Link></li>
                            <li className="top-list-item"><Link to="/write" className="link">WRITE</Link></li>
                            
                        </ul>
                    </div>
                    <div className="top-right">
                        { 
                            user ? 
                            (
                            <ul className="top-right-list">
                                <li className="top-right-item"> 
                                    { user && <Link to="/" className="link" onClick={handleLogout}>LOGOUT</Link> }
                                </li>
                                <li className="top-right-item">
                                    <img 
                                        className="top-img" 
                                        src={user.profileImg}
                                        alt="내 프로필 이미지" 
                                    />
                                </li>
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
                        <i className="top-search-icon fas fa-search"></i>
                    </div>
            </div>
            </div>
        </div>
    )
}
