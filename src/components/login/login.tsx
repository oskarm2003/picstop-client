import { createContext, useContext, useEffect, useRef, useState } from 'react'
import './login.less'
import CustomButton from '../customButton/customButton'
import DottedBackground from '../../visuals/dottedBackground'
import LoginForm from './loginForm'
import RegisterForm from './registerForm'
import { useNavigate } from 'react-router-dom'
import PasswordResetForm from './passwordResetForm'
import { loginViewSetterContext, loginViewContext, loginContainer } from '../../contexts'
import Title from './title'

export default function Login() {

    const [view, setView] = useState<'login' | 'login no-animation' | 'register' | 'password change'>('login')

    const mouseFollower = useRef<HTMLDivElement>(null)
    const wrapper = useRef<HTMLDivElement>(null)
    const shadow = useRef<HTMLDivElement>(null)
    const canvas = useRef<HTMLCanvasElement>(null)

    const navigate = useNavigate()

    useEffect(() => {
        if (wrapper.current === null || shadow.current === null || canvas.current === null) return
        wrapper.current.style.top = '50%'
        shadow.current.style.top = '50%'
        canvas.current.width = wrapper.current.offsetWidth
        canvas.current.height = wrapper.current.offsetHeight
        new DottedBackground(canvas.current)
    }, [])

    //decorative mouse events
    const onMouseMove = (x: number, y: number) => {

        if (mouseFollower.current === null || wrapper.current === null) return

        mouseFollower.current.style.left = x - wrapper.current.offsetLeft + (wrapper.current.offsetWidth / 2) - (mouseFollower.current.offsetWidth / 2) + 'px'
        mouseFollower.current.style.top = y - wrapper.current.offsetTop + (wrapper.current.offsetHeight / 2) - (mouseFollower.current.offsetHeight / 2) + 'px'
    }

    const onMouseOut = () => {
        if (mouseFollower.current === null) return
        mouseFollower.current.style.display = 'none'
    }

    const onMouseIn = () => {
        if (mouseFollower.current === null) return
        mouseFollower.current.style.display = 'block'
    }

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
                        ref={wrapper}
                        onMouseEnter={onMouseIn}
                        onMouseLeave={onMouseOut}
                        onMouseMove={(e) => { onMouseMove(e.clientX, e.clientY) }}>

                        <canvas ref={canvas}></canvas>
                        <div id="mouse-follower" ref={mouseFollower}></div>

                        {to_render}
                    </div>

                    <div className='skip-login'>
                        <CustomButton text='skip login' whenClicked={() => { navigate('/publicGallery') }} justText={true} color='#ffffff' />
                    </div>
                    <div ref={shadow} className="shadow"></div>

                </loginContainer.Provider>
            </loginViewContext.Provider>
        </loginViewSetterContext.Provider>
    )
}