import { useEffect, useRef, useState } from 'react'
import CustomInput from '../customInput/customInput'
import './login.less'
import CustomButton from '../customButton/customButton'
import DottedBackground from '../../visuals/dottedBackground'
import LoginForm from './loginForm'
import RegisterForm from './registerForm'

export default function Login() {

    const [view, setView] = useState<'login' | 'register'>('login')

    const mouseFollower = useRef<HTMLDivElement>(null)
    const wrapper = useRef<HTMLDivElement>(null)
    const shadow = useRef<HTMLDivElement>(null)
    const canvas = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (wrapper.current === null || shadow.current === null || canvas.current === null) return
        wrapper.current.style.top = '50%'
        shadow.current.style.top = '50%'
        canvas.current.width = wrapper.current.offsetWidth
        canvas.current.height = wrapper.current.offsetHeight
        new DottedBackground(canvas.current)
    }, [])

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

    const switchViews = () => {

        if (wrapper.current === null) return
        wrapper.current.classList.toggle('register')
        wrapper.current.classList.toggle('login')
        setView(view === 'login' ? 'register' : 'login')
    }

    return (
        <>
            <div className='account login' ref={wrapper} onMouseEnter={onMouseIn} onMouseLeave={onMouseOut} onMouseMove={(e) => { onMouseMove(e.clientX, e.clientY) }}>
                <canvas ref={canvas}></canvas>
                <div id="mouse-follower" ref={mouseFollower}></div>
                {view === 'register' && <RegisterForm />}
                <div className="title">
                    <h1>{view === 'login' ? 'Sign in' : 'Sign up'}</h1>
                    <CustomButton
                        text={view === 'login' ? '[ create account first ]' : '[ back to login ]'}
                        whenClicked={switchViews}
                        justText={true}
                        color={view === 'register' ? '#df5f5f' : undefined}
                    />
                </div>
                {view === 'login' && <LoginForm />}
            </div>
            <CustomButton text='[ skip login ]' whenClicked={() => { }} justText={true} color='#ffffff' />
            <div ref={shadow} className="shadow"></div>
        </>
    )
}