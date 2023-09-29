/**
 * Finds the image's most common color by drawing it on a 1x1 canvas
 * 
 * @param image - HTMLImageElement
 * 
 * @returns color in hex: #ffffff
 */
export default function getDominatingColor(image: HTMLImageElement) {

    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    const ctx = canvas.getContext('2d')

    //draw and get pixel data
    ctx?.drawImage(image, 0, 0, image.width, image.height, 0, 0, 1, 1)
    const data = ctx?.getImageData(0, 0, 1, 1).data
    if (data === undefined) { return '#7f7f7f5f' }
    const color = '#' + data[0].toString(16) + data[1].toString(16) + data[2].toString(16)

    return color

}