import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import "./home.scss"

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("http://localhost:5000/api/post");
            console.log(res);
        }
        fetchPosts();
    },[])
    return (
        <>
            <Header />
            <div className="home">
                <Sidebar />
                <Posts />
            </div>
        </>
    )
}