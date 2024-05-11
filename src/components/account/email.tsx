import { useEffect, useState } from "react";
import useVerifyEmail from "../../net/user/verifyEmail";
import CustomButton from "../common/customButton/customButton";

export default function Email({ verified, email }: { verified: boolean, email: string }) {

    const [result, loading, requestVerification] = useVerifyEmail()
    const [message, setMessage] = useState<{ msg: string, color: string }>({ msg: "", color: "" })

    useEffect(() => {
        if (result === "success") {
            setMessage({ color: "green", msg: "request sent! check your mailbox" })
        }
        else if (result === "not found") {
            setMessage({ color: "red", msg: "email not found" })
        }
        else if (result === "error") {
            setMessage({ color: "red", msg: "error" })
        }
    }, [result])

    const verifyEmail = () => {
        requestVerification(email)
    }

    return <div className={loading ? "loading" : ""}>
        <h3>email</h3>
        {verified ?
            <p>email verified✅</p>
            :
            <>
                <p>email not verified❌</p>
                {loading ? <p>sending...</p> :
                    <p style={{ color: message.color }}>{message.msg}</p>
                }
                <CustomButton
                    color="#5f5fff"
                    justText text="verify email"
                    whenClicked={verifyEmail}
                />
            </>
        }
    </div>
}