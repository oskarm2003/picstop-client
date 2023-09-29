export const createPhotoFile = (file_url: string, filename: string, previewPhotoPosition: [number, number], photoPreview: HTMLImageElement, previewWrapper: HTMLDivElement): Promise<File> => {

    return new Promise((resolve) => {
        //settings
        const size = 5000

        //vars
        const wrapperSize = previewWrapper.offsetHeight
        const photoWidth = photoPreview.width
        const photoHeight = photoPreview.height

        //create and adjust canvas element
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')

        //create image file using the given file
        const img = new Image()
        img.src = file_url

        img.onload = () => {
            const scale = img.width / photoWidth
            const topDistance = Math.floor(((-previewPhotoPosition[1] + photoHeight / 2) - wrapperSize / 2) * scale)
            const leftDistance = Math.floor(((-previewPhotoPosition[0] + photoWidth / 2) - wrapperSize / 2) * scale)

            ctx?.drawImage(img, leftDistance, topDistance, Math.floor(scale * wrapperSize), Math.floor(scale * wrapperSize), 0, 0, 5000, 5000)

            canvas.toBlob((blob) => {
                if (blob === null) return
                const extension = blob.type.split('/')[1]
                const file = new File([blob], filename + '.' + extension)
                resolve(file)
            })
        }
    })
}