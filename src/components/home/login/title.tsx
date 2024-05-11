import { loginViewContext, loginViewSetterContext } from "../../../contexts"
import { useContext } from 'react'
import CustomButton from "../../common/customButton/customButton"

export default function Title({ }) {

    const view = useContext(loginViewContext)
    const setView = useContext(loginViewSetterContext)

    const switchViews = () => {
        if (setView === null) return
        setView(view === 'register' ? 'login' : 'register')
    }

    return <div className="title">
        <h1>{view === 'register' ? 'Sign up' : 'Sign in'}</h1>
        <CustomButton
            text={view === 'register' ? '[ back to login ]' : '[ create account first ]'}
            whenClicked={switchViews}
            justText={true}
            color={view === 'register' ? '#df5f5f' : undefined}
        />
        {view === "register" ?
            <p className="note">NOTE: This is an amateur project. Even though I tried to ensure safety of the backend server, please do not use any password from your passwords pool to be extra safe.</p>
            : null}
    </div>

}