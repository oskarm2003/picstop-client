/**
 * Zoom in and out of the photo respecting the wrapper boundaries
 * 
 * @param photo HTMLImage with photo preview
 * @param previewWrapper HTMLDiv
 * @param photoPosition HTMLImage's position within the wrapper [x,y]
 * @param e 
 * @returns object {position: [number,number], size: [number,number]}
 */
export function zoomPhoto(photo: HTMLImageElement, previewWrapper: HTMLDivElement, photoPosition: [number, number], e: React.WheelEvent<HTMLDivElement>): { position: [number, number], size: [number, number] } {

    //vars
    const zoom = 1 - (Math.sign(e.deltaY) * 0.05)
    const hwRatio = photo.offsetHeight / photo.offsetWidth

    //one dimension is enough - wrapper is a square
    const wrapperSize = previewWrapper.offsetHeight
    let newHeight, newWidth

    if (hwRatio > 1) {
        newWidth = photo.offsetWidth * zoom

        if (newWidth < wrapperSize) {
            newWidth = wrapperSize
        }

        newHeight = newWidth * hwRatio
    }
    else {
        newHeight = photo.offsetHeight * zoom

        if (newHeight < wrapperSize) {
            newHeight = wrapperSize
        }

        newWidth = newHeight / hwRatio
    }

    let x = photoPosition[0]
    let y = photoPosition[1]

    //check if photo within the wrapper
    if (newWidth < wrapperSize || newHeight < wrapperSize) return { position: [x, y], size: [photo.offsetWidth, photo.offsetHeight] }

    //north edge
    if (newHeight / 2 - photoPosition[1] < wrapperSize / 2) {
        y -= wrapperSize / 2 - (newHeight / 2 - photoPosition[1])
    }
    //south edge
    else if (newHeight / 2 + photoPosition[1] < wrapperSize / 2) {
        y += wrapperSize / 2 - (newHeight / 2 + photoPosition[1])
    }
    //west edge
    if (newWidth / 2 - photoPosition[0] < wrapperSize / 2) {
        x -= wrapperSize / 2 - (newWidth / 2 - photoPosition[0])
    }
    //east edge
    else if (newWidth / 2 + photoPosition[0] < wrapperSize / 2) {
        x += wrapperSize / 2 - (newWidth / 2 + photoPosition[0])
    }

    return {
        position: [x, y], size: [newWidth, newHeight]
    }

}