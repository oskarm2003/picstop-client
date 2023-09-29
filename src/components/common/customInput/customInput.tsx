import { useRef } from 'react'
import './customInput.less'

export default function CustomInput({ type, label, reference, onKeyDown }: { type: 'password' | 'text', label: string, reference: React.RefObject<HTMLInputElement>, onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void }) {

    const title = useRef<HTMLParagraphElement>(null)

    const whenClicked = () => {
        if (title.current === null || reference.current === null) return
        title.current.classList.remove('in')
        reference.current.focus()
    }

    const whenOutOfFocus = () => {
        if (title.current === null || reference.current === null || reference.current.value != '') return
        title.current.classList.add('in')
    }

    return (
        <div className='input-container'>
            <p ref={title} className='in' onClick={whenClicked}>{label}</p><br />
            <input onKeyDown={(e) => onKeyDown(e)} onBlur={whenOutOfFocus} ref={reference} type={type} onFocus={whenClicked} />
        </div>
    )

}