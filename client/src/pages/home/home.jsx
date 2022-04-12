import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import "./home.scss"
import { useLocation } from "react-router-dom";
import { Context } from "../../context/Context";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const {search} = useLocation();
    const { user } = useContext(Context);
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("http://localhost:5000/api/post" + search);
            console.log("search가 바뀌었을때 res.data",res.data)
            setPosts(res.data)
        }
        fetchPosts();
    },[search])
    console.log("rendered")
    return (
        <>
            <Header />
            <div className="home-group">
                <div className="home-wrapper">
                    <div className="home">
                        {user && <Sidebar />}
                        <Posts posts = {posts} />
                    </div>
                </div>
            </div>
        </>
    )
}