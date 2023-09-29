import { useContext, useEffect, useRef, useState } from "react";
import CustomButton from "../../common/customButton/customButton";
import CustomInput from "../../common/customInput/customInput";
import { useNavigate } from "react-router-dom";
import { loginViewSetterContext } from "../../../contexts";
import getUserData from "../../../net/user/getUserData";
import useLogin from "../../../net/user/login";
import useGetUserData from "../../../net/user/getUserData";

export default function LoginForm() {

    const navigate = useNavigate()

    const [message, setMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const setView = useContext(loginViewSetterContext)

    const loginInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)

    const [response, login] = useLogin()
    const [userData, userDataError, getUserData] = useGetUserData()

    //on user data fetch
    useEffect(() => {
        if (userData === undefined) return
        if (userDataError) return
        document.cookie = 'username=' + userData.username
    }, [userData])

    //on login response
    useEffect(() => {
        if (response === undefined) return
        setLoading(false)
        if (loginInput.current === null) {
            setMessage('error')
            return
        }
        if (response === 'Not Found') {
            setMessage('user not found')
            loginInput.current?.parentElement?.classList.add('shake')
        }
        else if (response === 'Unauthorized') {
            setMessage('password incorrect')
            passwordInput.current?.parentElement?.classList.add('shake')
        }
        else if (response === 'Error') {
            setMessage('error occured')

        }
        else {
            //set cookie and proceed
            document.cookie = 'token=' + response.token
            if (loginInput.current?.value.includes('@')) {
                //fire user data fetch
                getUserData(loginInput.current.value)
            }
            else {
                document.cookie = 'username=' + loginInput.current.value
            }
            navigate('/publicGallery')
        }
    }, [response])

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