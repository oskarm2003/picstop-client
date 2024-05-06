import { useEffect, useRef } from 'react'
import './canvasBackground.less'
import DottedBackground from '../../../visuals/dottedBackground'

/**
 * Canvas Dotted Background - requires container
 *  
 */
export default function CanvasBackground({ color }: { color?: string }) {

    const canvas = useRef<HTMLCanvasElement>(null)

    useEffect(() => {

        const setCanvasDim = () => {
            if (canvas.current === null) return
            const parent = canvas.current.parentElement
            if (parent === null) return

            canvas.current.height = parent.offsetHeight
            canvas.current.width = parent.offsetWidth
            new DottedBackground(canvas.current, color)
        }

        if (canvas.current === null) return

        const resize_observer = new ResizeObserver(setCanvasDim)
        resize_observer.observe(canvas.current)
        setCanvasDim()

    }, [])

    return <canvas ref={canvas} className="canvas-background"></canvas>

}