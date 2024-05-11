import { useEffect, useState } from "react";
import useChangePassword from "../../net/user/changePassword";
import CustomButton from "../common/customButton/customButton";

export default function PasswordChange({ verified, email }: { verified: boolean, email: string }) {

    const [result, loading, requestPasswordChange] = useChangePassword()
    const [message, setMessage] = useState<{ color: string, msg: string }>({ color: "", msg: "" })

    useEffect(() => {
        if (result === "success")
            setMessage({ color: "green", msg: "request sent! check your mailbox" })
        else if (result === "wrong data format")
            setMessage({ color: "red", msg: "wrong input data format" })
        else if (result === "error")
            setMessage({ color: "red", msg: "error" })
    }, [result])

    const changePassword = () => {
        requestPasswordChange(email)
    }

    return <div className={loading ? "loading" : ""}>
        <h3>password</h3>
        {verified ?
            <>
                {loading ?
                    <p>sending...</p>
                    :
                    <p style={{ color: message.color }}>{message.msg}</p>
                }
                <CustomButton color="#5f5fff" justText text="change password" whenClicked={changePassword} />
            </>
            :
            <p>verify email to change password</p>
        }
    </div>

}