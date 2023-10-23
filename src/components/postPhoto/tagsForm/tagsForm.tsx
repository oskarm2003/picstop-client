import { useEffect, useRef, useState } from 'react'
import CustomButton from '../../common/customButton/customButton'
import './tagsForm.less'
import usePostTags from '../../../net/post resources/postTags'
import { useNavigate } from 'react-router-dom'
import getCookie from '../../../getCookie'

export default function TagsForm({ photoName, subtitleColor, onPostSuccess }:
    { photoName: string, subtitleColor: string, onPostSuccess: (photoName?: string) => void }) {

    const inputRef = useRef<HTMLTextAreaElement>(null)
    const [isEmpty, setIsEmpty] = useState(true)
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const [response, loading, sendRequest] = usePostTags()

    //watch for response change
    useEffect(() => {
        if (response === undefined) return
        setMessage(response)

        //proceed to just added photo
        if (response === 'success') {
            onPostSuccess(photoName)
        }

    }, [response])

    const onInputKeyUp = () => {
        if (inputRef.current === null) return true
        if (inputRef.current.value.length === 0 && !isEmpty) setIsEmpty(true)
        else if (inputRef.current.value.length != 0 && isEmpty) setIsEmpty(false)
    }

    const onInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.code === 'Enter') {
            e.preventDefault()
            postTags()
        }
    }

    const postTags = () => {
        if (inputRef.current === null) return true
        if (inputRef.current.value === '') {
            onPostSuccess(photoName)
            return
        }

        const tags = inputRef.current.value.replace(/\s/g, '').split('#')
        tags.shift()

        if (tags.length === 0) {
            setMessage('no tags posted')
            return
        }

        //request tags post
        sendRequest(tags, photoName)
    }

    return <div className="tags-form">
        <h1>Tag Your Photo:</h1>
        <div className='input-wrapper'>
            <p className='description'>Add tags to the photo <b style={{ color: subtitleColor }}>{photoName}</b></p>
            <p className='rules'>Each tag should start with "#". Spaces will be trimmed.</p>
            <textarea placeholder='#beach #sunny_day'
                onKeyUp={onInputKeyUp}
                onKeyDown={(e) => onInputKeyDown(e)}
                ref={inputRef}
                cols={30} rows={10}></textarea>
            <div>
                <CustomButton loading={loading} text={isEmpty ? 'skip' : 'post'} whenClicked={postTags} />
                <p style={{ height: '1.5rem' }} className={message.length === 0 ? '' : 'message'}>{message}</p>
            </div>
        </div>
    </div>

}