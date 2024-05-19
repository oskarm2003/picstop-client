/**
 * Scroller class to scroll reel with velocity that can be appended any time
 */
export default class Scroller {

    noReduceCountdown: number
    minPos: number
    maxPos: number
    speed: number

    constructor(minPos: number, maxPos: number) {
        this.minPos = minPos
        this.maxPos = maxPos
        this.noReduceCountdown = 0
        this.speed = 0
    }

    addSpeed(value: number) {
        this.noReduceCountdown = 10
        this.speed += value
    }

    private reduceSpeed(value: number) {
        if (this.noReduceCountdown == 0)
            this.speed -= value
        else
            this.noReduceCountdown--
    }

    run(setReelPosition: React.Dispatch<React.SetStateAction<number>>, reelPosition: number) {

        // check if should stop
        if (Math.abs(this.speed) < 0.001) {
            this.speed = 0
            return
        }

        //change reel position
        const newReelPosition = reelPosition - this.speed

        //check if in range
        if (-newReelPosition < this.minPos) {
            setReelPosition(0)
            this.speed = 0
            return
        }

        if (-newReelPosition > this.maxPos) {
            setReelPosition(-this.maxPos)
            this.speed = 0
            return
        }

        //update
        setReelPosition(newReelPosition)
        this.reduceSpeed(Math.sign(this.speed) * 0.01)

        //recurency
        if (this.speed != 0)
            requestAnimationFrame(() => this.run(setReelPosition, newReelPosition))
    }
}