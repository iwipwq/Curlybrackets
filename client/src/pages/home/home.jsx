import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import "./home.scss"
import { useLocation } from "react-router-dom";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const {search} = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("http://localhost:5000/api/post" + search);
            setPosts(res.data)
        }
        fetchPosts();
    },[search])
    return (
        <>
            <Header posts = {posts}/>
            <div className="home-group">
                <div className="home-wrapper">
                    <div className="home">
                        <Sidebar />
                        <Posts posts = {posts}  />
                    </div>
                </div>
            </div>
        </>
    )
}