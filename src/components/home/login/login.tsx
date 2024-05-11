import { useEffect, useRef, useState } from 'react'
import './login.less'
import CustomButton from '../../common/customButton/customButton'
import LoginForm from './loginForm'
import RegisterForm from './registerForm'
import { useNavigate } from 'react-router-dom'
import PasswordResetForm from './passwordResetForm'
import { loginViewSetterContext, loginViewContext, loginContainer } from '../../../contexts'
import Title from './title'
import CanvasBackground from '../../common/canvasBackground/canvasBackground'
import MouseFollower from '../../common/mouseFollower/mouseFollower'

export default function Login() {

    const [view, setView] = useState<'login' | 'login no-animation' | 'register' | 'password change'>('login')

    const wrapper = useRef<HTMLDivElement>(null)
    const shadow = useRef<HTMLDivElement>(null)

    const navigate = useNavigate()

    useEffect(() => {
        if (wrapper.current === null || shadow.current === null) return
        wrapper.current.style.top = '50%'
        shadow.current.style.top = '50%'
    }, [])

    let to_render = <></>
    if (view === 'register') to_render = <><RegisterForm /><Title /></>
    else if (view.startsWith('login')) to_render = <><Title /><LoginForm /></>
    else if (view === 'password change') to_render = <><Title /><PasswordResetForm /></>

    //component render
    return (
        <loginViewSetterContext.Provider value={setView}>
            <loginViewContext.Provider value={view}>
                <loginContainer.Provider value={wrapper}>

                    <div
                        className={'account ' + (view === 'password change' ? 'password-change' : view)}
                        ref={wrapper}>

                        <CanvasBackground />
                        <MouseFollower color={view === 'register' ? '#cf9f7f' : '#99aaff'} />
                        {to_render}
                    </div>

                    <div className='skip-login'>
                        <CustomButton text='skip login' whenClicked={() => { navigate('/gallery') }} justText={true} color='#ffffff' />
                    </div>
                    <div ref={shadow} className="shadow"></div>

                </loginContainer.Provider>
            </loginViewContext.Provider>
        </loginViewSetterContext.Provider>
    )
}