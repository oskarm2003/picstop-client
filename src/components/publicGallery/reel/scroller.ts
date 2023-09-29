let SPEED = 0

/**
 * Scroller class to scroll reel with velocity that can be appended any time
 */
export default class Scroller {

    allowSpeedReduce: boolean
    minPos: number
    maxPos: number

    constructor(minPos: number, maxPos: number) {
        this.allowSpeedReduce = true
        this.minPos = minPos
        this.maxPos = maxPos
    }

    addSpeed(value: number) {
        this.allowSpeedReduce = false
        SPEED += value
        setTimeout(() => { this.allowSpeedReduce = true }, 100)
    }

    private reduceSpeed(value: number) {
        if (this.allowSpeedReduce) {
            SPEED -= value
        }
    }

    getSpeed() {
        return SPEED
    }

    run(setReelPosition: React.Dispatch<React.SetStateAction<number>>, reelPosition: number) {

        // check if should stop
        if (Math.abs(SPEED) < 0.001) {
            SPEED = 0
            return
        }

        //change reel position
        const newReelPosition = reelPosition - SPEED

        //check if in range
        if (-newReelPosition < this.minPos) {
            setReelPosition(0)
            SPEED = 0
            return
        }
        if (-newReelPosition > this.maxPos) {
            setReelPosition(-this.maxPos)
            SPEED = 0
            return
        }

        //update
        setReelPosition(newReelPosition)
        this.reduceSpeed(Math.sign(SPEED) * 0.01)

        //recurency
        setTimeout(() => {
            this.run(setReelPosition, newReelPosition)
        }, 1)
    }
}