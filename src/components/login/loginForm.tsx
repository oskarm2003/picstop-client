import { useRef } from "react";
import CustomButton from "../customButton/customButton";
import CustomInput from "../customInput/customInput";

export default function LoginForm() {

    const loginInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)

    return <div className="form">
        <CustomInput type='text' label='username or email' reference={loginInput} />
        <CustomInput type='password' label='password' reference={passwordInput} />
        <CustomButton text='log in' whenClicked={() => { }} />
    </div>

}