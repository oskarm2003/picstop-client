import { useNavigate } from "react-router-dom";
import CustomButton from "../common/customButton/customButton";
import useDeleteUser from "../../net/user/deleteUser";
import { useEffect, useState } from "react";

export default function Session({ username }: { username: string }) {

    const navigate = useNavigate()
    const [result, loading, deleteUser] = useDeleteUser()
    const [message, setMessage] = useState<{ color: string, msg: string }>({ color: "", msg: "" })

    useEffect(() => {
        if (result === "success")
            logOut()
        else if (result === "unauthorized")
            setMessage({ color: "red", msg: "you are not authorized. Session token might have expired." })
        else if (result === "not found")
            setMessage({ color: "red", msg: "account not found" })
        else if (result === "error")
            setMessage({ color: "red", msg: "unknown error" })
    }, [result])

    const logOut = () => {
        document.cookie = 'username=; Max-Age=0'
        document.cookie = 'token=; Max-Age=0'
        navigate("/gallery")
    }

    const deleteAccount = () => {
        if (confirm("Are you sure you want to delete your account? All your login data, posted photos and comments will be removed forever.")) {
            deleteUser(username)
        }
    }

    return <div className={loading ? "loading" : ""}>
        <h3>session and account</h3>
        <CustomButton color="#5f5fff" justText text="log out" whenClicked={logOut} />
        <p style={{ color: message.color }}>{message.msg}</p>
        <CustomButton justText text="delete account" whenClicked={deleteAccount} color="red" />
    </div>

}