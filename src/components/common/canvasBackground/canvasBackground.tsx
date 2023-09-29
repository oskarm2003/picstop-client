import { useEffect, useRef } from 'react'
import './canvasBackground.less'
import DottedBackground from '../../../visuals/dottedBackground'

/**
 * Canvas Dotted Background - requires container
 *  
 */
export default function CanvasBackground({ wrapper }: { wrapper: HTMLDivElement }) {

    const canvas = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (canvas.current === null) return
        canvas.current.height = wrapper.offsetHeight
        canvas.current.width = wrapper.offsetWidth
        new DottedBackground(canvas.current)
    }, [])

    return <canvas ref={canvas} className="canvas-background"></canvas>

}