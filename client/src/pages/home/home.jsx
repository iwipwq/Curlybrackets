import { useState, useEffect, useContext } from "react";
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import "./home.scss"

import { Context } from "../../context/Context";

export default function Home() {
    const { user } = useContext(Context);
    return (
        <>
            <Header />
            <div className="home-group">
                <div className="home-wrapper">
                    <div className="home">
                        {user && <Sidebar />}
                        <Posts />
                    </div>
                </div>
            </div>
        </>
    )
}