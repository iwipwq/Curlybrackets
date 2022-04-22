import { useContext } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import SinglePost from "../../components/singlePost/SinglePost"
import { Context } from "../../context/Context"
import "./single.scss"

export default function Single() {
  const { user } = useContext(Context);
  return (
    <div className="single-wrapper">
        <div className="single">
            { user && <Sidebar />}
            <SinglePost />
        </div>
    </div>
  )
}
