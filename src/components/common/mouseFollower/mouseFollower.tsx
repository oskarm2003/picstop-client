import { useEffect, useRef, useState } from 'react'
import './mouseFollower.less'

export default function MouseFollower({ color }:
    { color?: string }) {

    const [position, setPosition] = useState([0, 0])
    const mouseFollower = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (mouseFollower.current === null) return
        const container = mouseFollower.current.parentElement
        if (container === null) return

        container.onmousemove = (e) => {
            if (mouseFollower.current === null) return
            if (container === null) return
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
    }, [mouseFollower])


    return <div className="mouse-follower" ref={mouseFollower} style={{ left: position[0], top: position[1], backgroundColor: color }}></div>

}