export default class DottedBackground {

    //settings
    private static background_color = 'rgba(255,255,255,0)'
    private color = '#eee'
    private static point_size = 3
    private static point_density = 80
    private repulsion_range = 0

    private ctx: CanvasRenderingContext2D
    private dimensions: [number, number]
    private memoized_background_args: [[number, number], [number, number]] = [[0, 0], [0, 0]]

    constructor(canvas: HTMLCanvasElement, color?: string) {

        const context = canvas.getContext('2d')
        if (context === null) throw 'context not created'
        this.ctx = context

        if (color) this.color = color

        this.dimensions = [canvas.width, canvas.height]
        this.drawBackground([0, 0], [0, 0])
    }

    /**
     * Draws background on the canvas
     * 
     * @param displacement - [number, number] - background displacement [x axis, y axis]
     * @param mouse_pos - [number, number] - mouse position [x, y]
     */
    private drawBackground(displacement: [number, number], mouse_pos: [number, number]) {

        const gap_size = Math.floor(window.innerHeight / DottedBackground.point_density)
        const horizontal_density = Math.floor(window.innerWidth / gap_size)

        //clear screen
        this.ctx.fillStyle = DottedBackground.background_color
        this.ctx.fillRect(0, 0, this.dimensions[0], this.dimensions[1])

        for (let i = 0; i < 2 * DottedBackground.point_density + 1; i++) {
            for (let j = 0; j < 2 * horizontal_density + 1; j++) {

                let x = gap_size * (j + displacement[0])
                let y = gap_size * (i + displacement[1]) - Math.floor(window.innerHeight)

                //skew
                const angle = Math.PI / 8
                y += x * Math.sin(angle)
                x *= Math.cos(angle)

                //check if in mouse range and repulse
                const r = Math.sqrt(Math.pow((mouse_pos[0] - x), 2) + Math.pow((mouse_pos[1] - y), 2))
                if (this.repulsion_range > r) {
                    const similarity_scale = this.repulsion_range / r
                    x = mouse_pos[0] - ((mouse_pos[0] - x) * similarity_scale)
                    y = mouse_pos[1] - ((mouse_pos[1] - y) * similarity_scale)
                }

                //draw a point 
                this.placePoint(x, y)
            }
        }
    }

    private placePoint(x: number, y: number) {

        this.ctx.beginPath()
        this.ctx.fillStyle = this.color
        this.ctx.arc(x, y, DottedBackground.point_size, 0, 2 * Math.PI, false)
        this.ctx.fill()

    }

    /**
    * Calculates background behaviour according to the mouse movement
    *
    * @param x - number - mouse x position
    * @param y - number - mouse y position
    */
    onMouseMove(x: number, y: number) {

        const displacement: [number, number] = [
            (x - (window.innerWidth / 2)) / (window.innerWidth),
            (y - (window.innerHeight / 2)) / (window.innerHeight)
        ]

        this.memoized_background_args = [displacement, [x, y]]
        this.drawBackground(displacement, [x, y])

    }

    async changeRepulsion(value: number, steps: number) {

        //TODO: debug repulsion collision

        const step = -Math.floor(Math.sign(this.repulsion_range - value) * Math.abs((this.repulsion_range - value) / steps))
        const destination = this.repulsion_range + (steps * step)

        const transition = () => {

            this.repulsion_range += step
            this.drawBackground(...this.memoized_background_args)
            if (this.repulsion_range === destination) return
            window.requestAnimationFrame(transition)

        }
        window.requestAnimationFrame(transition)
    }
}