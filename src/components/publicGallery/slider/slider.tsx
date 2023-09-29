import './slider.less'

export default function Slider({ progress, setInDrag, reference }:
    { progress: number, setInDrag: React.Dispatch<React.SetStateAction<boolean>>, reference: React.RefObject<HTMLDivElement> }) {


    return <div className='slider' ref={reference}>
        <div className="progress"
            onMouseDown={() => setInDrag(true)}
            style={{ left: progress * 100 + '%' }}></div>
    </div>

}