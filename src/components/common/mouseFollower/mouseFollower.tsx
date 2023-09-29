import { useRef, useState } from 'react'
import './mouseFollower.less'

export default function MouseFollower({ container, color }:
    { container: HTMLDivElement, color?: string }) {

    const [position, setPosition] = useState([0, 0])
    const mouseFollower = useRef<HTMLDivElement>(null)

    container.onmousemove = (e) => {
        if (mouseFollower.current === null) return
        const { x, y } = container.getBoundingClientRect()
        setPosition([
            e.clientX - x - mouseFollower.current.offsetWidth / 2,
            e.clientY - y - mouseFollower.current.offsetHeight / 2
        ])
    }

    container.onmouseenter = () => {
        if (mouseFollower.current === null) return
        mouseFollower.current.style.display = 'block'
    }

    container.onmouseleave = () => {
        if (mouseFollower.current === null) return
        mouseFollower.current.style.display = 'none'
    }

    return <div className="mouse-follower" ref={mouseFollower} style={{ left: position[0], top: position[1], backgroundColor: color }}></div>

}