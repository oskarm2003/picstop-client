import { useContext, useRef, useState } from "react";
import CustomInput from "../customInput/customInput";
import CustomButton from "../customButton/customButton";
import changePassword from "../../net/user/changePassword";
import { loginContainer, loginViewSetterContext } from "../../contexts";

export default function PasswordResetForm() {

    const [message, setMessage] = useState<{ color: string, content: string }>({ color: '', content: '' })
    const [loading, setLoading] = useState(false)
    const emailInput = useRef<HTMLInputElement>(null)
    const setView = useContext(loginViewSetterContext)
    const parentWrapper = useContext(loginContainer)

    //send request
    const resetPassword = () => {
        //validate data
        if (emailInput.current === null) return
        if (emailInput.current.value === '') {
            emailInput.current.parentElement?.children[0].classList.add('empty')
            return
        }

        if (!emailInput.current.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            setMessage({ content: 'given data is not an email', color: 'red' })
            return
        }

        setLoading(true)
        changePassword(emailInput.current.value)
            .then(() => {
                setLoading(false)
                setMessage({ color: 'green', content: 'request sent, check your email' })
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                setMessage({ color: 'red', content: 'error, email might not be verified' })
            })
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.target instanceof HTMLInputElement) {
            e.target.parentElement?.children[0].classList.remove('empty')
        }
        if (e.code === 'Enter') resetPassword()
    }

    const navigateToLogin = () => {
        if (setView === null || parentWrapper?.current === null) return
        setView('login no-animation')
    }

    return <div className="form">
        <p>If the email is verified the password change request will be sent to the given email address.</p>
        <CustomInput type="text" label="email" reference={emailInput} onKeyDown={onKeyDown} />
        <CustomButton text="send" whenClicked={resetPassword} loading={loading} />
        <CustomButton text="back to login" whenClicked={navigateToLogin} justText />
        <div style={{ height: '1rem', margin: '1rem' }}><p className={message.content === '' ? '' : 'message'} style={{ color: message.color }}>{message.content}</p></div>
    </div>

}