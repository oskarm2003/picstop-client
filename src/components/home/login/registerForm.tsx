import { useEffect, useRef, useState } from "react";
import CustomInput from "../../common/customInput/customInput";
import CustomButton from "../../common/customButton/customButton";
import useRegister from "../../../net/user/register";

export default function RegisterForm() {

    const [message, setMessage] = useState<{ content: string, color: string }>({ content: '', color: '' })
    const [loading, setLoading] = useState<boolean>(false)

    const usernameInput = useRef<HTMLInputElement>(null)
    const emailInput = useRef<HTMLInputElement>(null)
    const passwordInput_1 = useRef<HTMLInputElement>(null)
    const passwordInput_2 = useRef<HTMLInputElement>(null)

    const [response, register] = useRegister()

    useEffect(() => {
        if (response === undefined) return
        setLoading(false)
        if (response === 'Created') {
            clearInput()
            setMessage({ color: "green", content: "account successfully created" })
        }
        else if (response === 'Conflict') {
            setMessage({ color: "red", content: "username or email taken" })
        }
        else if (response === 'Unprocessable Entity') {
            setMessage({ color: "red", content: "invalid input" })
        }
        else if (response === 'Error') {
            setMessage({ color: 'red', content: 'error occured' })
        }
    }, [response])

    //clear all inputs
    const clearInput = () => {
        for (let input of [usernameInput.current, emailInput.current, passwordInput_1.current, passwordInput_2.current]) {
            if (input === null) continue
            input.value = ''
            input.parentElement?.children[0].classList.add('in')
        }
    }

    //on button click
    const attemptToRegister = () => {
        //data validation
        if (usernameInput.current === null ||
            emailInput.current === null ||
            passwordInput_1.current === null ||
            passwordInput_2.current === null) return

        let empty = false
        for (let el of [
            usernameInput.current,
            emailInput.current,
            passwordInput_1.current,
            passwordInput_2.current,]) {

            if (el.value === '') {
                empty = true
                el.parentElement?.children[0].classList.add('empty')
            }

        }
        if (empty) {
            setMessage({ color: 'red', content: 'please fill all data fields' })
            return
        }


        if (!emailInput.current.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            setMessage({ content: 'given email is not an email', color: 'red' })
            return
        }

        if (passwordInput_1.current.value != passwordInput_2.current.value) {
            setMessage({ color: 'red', content: "passwords don't match" })
            return
        }

        //register the user
        setLoading(true)
        register(usernameInput.current.value, emailInput.current.value, passwordInput_1.current.value)
    }

    //on input key down
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            attemptToRegister()
        }
        if (e.target instanceof HTMLElement) {
            e.target.parentElement?.children[0].classList.remove('empty')
        }
    }

    //component render
    return <div className="form">
        <CustomInput onKeyDown={onKeyDown} type="text" label="username" reference={usernameInput} />
        <CustomInput onKeyDown={onKeyDown} type="text" label="email" reference={emailInput} />
        <CustomInput onKeyDown={onKeyDown} type="password" label="password" reference={passwordInput_1} />
        <CustomInput onKeyDown={onKeyDown} type="password" label="repeat password" reference={passwordInput_2} />
        <CustomButton text="register" whenClicked={attemptToRegister} loading={loading} />
        <div style={{ height: '1rem' }}>
            <p style={{ color: message.color }} className={message.content === '' ? '' : 'message'}>{message.content}</p>
        </div>
    </div>

}