import { useContext, useRef, useState } from "react";
import CustomButton from "../customButton/customButton";
import CustomInput from "../customInput/customInput";
import login from "../../net/user/login";
import { useNavigate } from "react-router-dom";
import { loginViewSetterContext } from "../../contexts";

export default function LoginForm() {

    const navigate = useNavigate()

    const [message, setMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const setView = useContext(loginViewSetterContext)

    const loginInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)

    //on button click
    const attemptToLogin = () => {
        if (loginInput.current === null || passwordInput.current === null) return

        //if empty data
        if (loginInput.current.value === '' || passwordInput.current.value === '') {
            for (let input of [loginInput.current, passwordInput.current]) {
                if (input.value === '') {
                    input.parentElement?.children[0].classList.add('empty')
                    setMessage('please fill all data fields')
                }
            }
            return
        }
        setLoading(true)
        loginInput.current?.parentElement?.classList.remove('shake')
        passwordInput.current?.parentElement?.classList.remove('shake')
        login(loginInput.current.value, passwordInput.current.value)
            .then(result => {
                setLoading(false)
                if (result === 'Not Found') {
                    setMessage('user not found')
                    loginInput.current?.parentElement?.classList.add('shake')
                }
                else if (result === 'Unauthorized') {
                    setMessage('password incorrect')
                    passwordInput.current?.parentElement?.classList.add('shake')
                }
                else {
                    //set cookie and proceed
                    document.cookie = 'token=' + result.token
                    navigate('/publicGallery')
                }
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                setMessage('error occured')
            })
    }

    //on input key down
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.target instanceof HTMLElement) {
            e.target.parentElement?.children[0].classList.remove('empty')

        }
        if (e.code === 'Enter') {
            attemptToLogin()
        }
    }

    //on password change click
    const passwordChangeView = () => {
        if (setView === null) return
        setView('password change')
    }

    //component render
    return <div className="form">
        <CustomInput onKeyDown={onKeyDown} type='text' label='username or email' reference={loginInput} />
        <CustomInput onKeyDown={onKeyDown} type='password' label='password' reference={passwordInput} />
        <CustomButton text='log in' whenClicked={attemptToLogin} loading={loading} />
        <CustomButton text="forgot your password?" whenClicked={passwordChangeView} justText={true} />
        <div style={{ margin: '1rem', height: '1rem' }}><p className={message === '' ? '' : 'message'} style={{ color: 'red' }}>{message}</p></div>
    </div>

}