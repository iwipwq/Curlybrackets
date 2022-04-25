import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./sidebar.scss"
import userIcon from "../../img/icon-user.png"
import { axiosInstance } from "../../config";


export default function Sidebar() {
    const [cats,setCats] = useState([]);
    const { user } = useContext(Context);
    const PF = "https://iwipwq-nest.herokuapp.com/images/"
    useEffect(()=> {
        const getCats = async() => {
            const res = await axiosInstance.get("/category");
            setCats(res.data);
        };
        getCats();
    },[])

  return (
    <div className="sidebar">
        <div className="sidebar-item">
            <span className="sidebar-title">ABOUT ME</span>
            <img src={user?.profileImg ? PF + user.profileImg : userIcon} alt="내 프로필 사진" />
            <p>{user.biography}</p>
        </div>
        <div className="sidebar-item">
            <span className="sidebar-title">CATEGORIES</span>
            <ul className="sidebar-list">
                {cats.map((cat) => (
                <li className="sidebar-list-item"><Link to={`?=${cat.name}`} className="link">{cat.name}</Link></li>
                ))}
            </ul>
        </div>
        <div className="sidebar-item">
            <span className="sidebar-title">FOLLOW</span>
            <ul className="sidebar-social">
                <i className="sidebar-icon fa-brands fa-github-square"></i>
                <i className="sidebar-icon fa-brands fa-instagram-square"></i>
            </ul>
        </div>
    </div>
  )
}

