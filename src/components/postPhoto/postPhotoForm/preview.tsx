import { useState, useEffect } from "react"
import { zoomPhoto } from "./moveAndResize"
import Loading from "../../common/loading/loading"

export default function Preview({ loading, photo, wrapper, previewFile, setPhotoPosition, fileInput, photoPosition }:
    { loading: boolean, setPhotoPosition: React.Dispatch<React.SetStateAction<[number, number]>>, photo: React.RefObject<HTMLImageElement>, wrapper: React.RefObject<HTMLDivElement>, photoPosition: [number, number], previewFile: string | null, fileInput: React.RefObject<HTMLInputElement> }) {

    const [allowSelect, setAllowSelect] = useState<boolean>(true)
    const [lastMousePos, setLastMousePos] = useState<[number, number]>([0, 0])
    const [photoSize, setPhotoSize] = useState<[string, string]>(['', ''])
    const [isDragged, setIsDragged] = useState<boolean>(false)
    const [displayPrompt, setDisplayPrompt] = useState<boolean>(true)

    //photo resize to fit preview div
    useEffect(() => {
        setPhotoPosition([0, 0])
        if (photo.current === null) return
        if (photo.current.offsetHeight > photo.current.offsetWidth) {
            setPhotoSize(['110%', ''])
        }
        else {
            setPhotoSize(['', '110%'])
        }
    }, [previewFile])

    //adjust photo placement
    const movePhoto = (e: MouseEvent) => {
        if (!isDragged || photo.current === null || wrapper.current === null) return
        if (loading) return
        setAllowSelect(false)

        let x = photoPosition[0] - (lastMousePos[0] - e.clientX)
        let y = photoPosition[1] - (lastMousePos[1] - e.clientY)

        if (photo.current.offsetWidth / 2 - Math.abs(x) < wrapper.current.offsetWidth / 2) x = photoPosition[0]
        if (photo.current.offsetHeight / 2 - Math.abs(y) < wrapper.current.offsetHeight / 2) y = photoPosition[1]

        if (displayPrompt) setDisplayPrompt(false)
        setPhotoPosition([x, y])
        setLastMousePos([e.clientX, e.clientY])
    }


    //zoom the photo
    const onScroll = (e: React.WheelEvent<HTMLDivElement>) => {
        if (photo.current === null || wrapper.current === null) return
        if (loading) return

        const result = zoomPhoto(photo.current, wrapper.current, photoPosition, e)

        //set values
        if (displayPrompt) setDisplayPrompt(false)
        setPhotoSize([result.size[0] + 'px', result.size[1] + 'px'])
        setPhotoPosition([result.position[0], result.position[1]])
    }

    //on drag start
    const onDragStart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDragged(true)
        setLastMousePos([e.clientX, e.clientY])
        if (wrapper.current === null) return
        wrapper.current.style.cursor = 'grabbing'
    }

    //on drag end
    const onDragEnd = () => {
        setIsDragged(false)
        setTimeout(() => setAllowSelect(true), 10)
        if (wrapper.current === null) return
        wrapper.current.style.cursor = ''
    }

    //select a file
    const selectFile = () => {
        if (!allowSelect) return
        if (loading) return
        if (fileInput.current === null) return
        fileInput.current.click()
    }

    //window events
    window.onmousemove = (e) => movePhoto(e)
    window.onmouseup = onDragEnd

    return <div className={'preview' + (previewFile === null ? '' : ' filled')} ref={wrapper} onClick={selectFile} onMouseDown={onDragStart} onWheel={(e) => onScroll(e)}>
        {previewFile != null ?
            <>
                <img
                    src={previewFile}
                    ref={photo}
                    alt="selected file"
                    style={{
                        left: photoPosition[0] + 'px',
                        top: photoPosition[1] + 'px',
                        width: photoSize[0],
                        height: photoSize[1]
                    }} />
                {displayPrompt && <div className="prompt">
                    <p>adjust photo's size and position</p>
                </div>
                }
            </> :
            <h2>select a file</h2>
        }
        {loading && <div className="prompt">
            <Loading color="#2f2f2f" size={0.5}></Loading></div>}
    </div>

}