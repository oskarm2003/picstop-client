/**
 * Smoothly changes some value.
 * Each frame goes for 10ms
 * 
 * @param objectReference - object that end value is being changed
 * @param objectKey - object key to select
 * @param desired - desired value
 * @param steps - number of steps (frames of animation)
 */
export default function animate(objectReference: any, objectKey: string | number, desired: number, steps: number, step?: number) {

    if (steps === 0) {
        objectReference[objectKey] = desired
        return
    }
    if (step === undefined) {
        const step = (desired - objectReference[objectKey]) / steps
        animate(objectReference, objectKey, desired, steps, step)
        return
    }
    objectReference[objectKey] += step

    setTimeout(() => { animate(objectReference, objectKey, desired, steps - 1, step) }, 10)

}