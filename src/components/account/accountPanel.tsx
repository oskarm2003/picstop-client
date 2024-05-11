import { useNavigate } from "react-router-dom"
import getCookie from "../../getCookie"
import "./accountPanel.less"
import useGetUserData from "../../net/user/getUserData"
import { useEffect } from "react"
import Loading from "../common/loading/loading"
import Userdata from "./userdata"
import Email from "./email"
import PasswordChange from "./passwordChange"
import Session from "./session"

export default function AccountPanel() {

    const navigate = useNavigate()
    const [userdata_response, userdata_loading, getUserData] = useGetUserData()
    const username = getCookie("username")

    //if no user logged in
    if (username === undefined) {
        alert("resource unauthorized")
        navigate("/gallery")
        return
    }

    useEffect(() => {
        if (userdata_response === undefined) {
            return getUserData(username)
        }
    }, [userdata_response])

    if (userdata_loading || userdata_response === undefined)
        return <Loading color="#cfcfcf" size={2} />

    return <div className="account-panel">
        <Userdata
            id={userdata_response.id}
            username={userdata_response.username}
            email={userdata_response.email}
            update_timestamp={userdata_response.update_timestamp === undefined ?
                Date.now() :
                userdata_response.update_timestamp
            }
        />
        <Email verified={userdata_response.verified == 1} email={userdata_response.email} />
        <PasswordChange verified={userdata_response.verified == 1} email={userdata_response.email} />
        <Session username={userdata_response.username} />
    </div>

}