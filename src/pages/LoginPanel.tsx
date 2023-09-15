import { useNavigate } from "react-router-dom"

export default function LoginPanel() {

    const navigate = useNavigate()

    const clicked = () => {
        navigate('/')
    }

    return <>
        <h1>Login Panel</h1>
        <button onClick={clicked}>go home</button>
    </>

}