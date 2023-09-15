import { useRef } from "react";
import CustomInput from "../customInput/customInput";
import CustomButton from "../customButton/customButton";

export default function RegisterForm() {

    const usernameInput = useRef<HTMLInputElement>(null)
    const emailInput = useRef<HTMLInputElement>(null)
    const passwordInput_1 = useRef<HTMLInputElement>(null)
    const passwordInput_2 = useRef<HTMLInputElement>(null)

    return <div className="form">
        <CustomInput type="text" label="username" reference={usernameInput} />
        <CustomInput type="text" label="email" reference={emailInput} />
        <CustomInput type="password" label="password" reference={passwordInput_1} />
        <CustomInput type="password" label="repeat password" reference={passwordInput_2} />
        <CustomButton text="register" whenClicked={() => { }}
        />
    </div>

}