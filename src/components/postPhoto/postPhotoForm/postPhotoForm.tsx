import { useContext, useEffect, useRef, useState } from 'react'
import CustomInput from '../../common/customInput/customInput'
import './postPhotoForm.less'
import CustomButton from '../../common/customButton/customButton'
import Preview from './preview'
import { createPhotoFile } from './onPostFile'
import getDominatingColor from './getDominatingColor'
import { setMouseFollowerColorContext } from '../../../contexts'
import usePostPhoto from '../../../net/post resources/postPhoto'

export default function PostPhotoForm({ buttonText, onSent }:
    { buttonText: string, onSent: (photoName: string) => void }) {

    const [previewSrc, setPreviewSrc] = useState<null | string>(null)
    const [photoPosition, setPhotoPosition] = useState<[number, number]>([0, 0])
    const [message, setMessage] = useState<{ content: string, color: string }>({ content: '', color: '' })
    const [loading, setLoading] = useState<boolean>(false)
    const [photoName, setPhotoName] = useState<undefined | string>()

    const titleInput = useRef<HTMLInputElement>(null)
    const fileInput = useRef<HTMLInputElement>(null)
    const wrapper = useRef<HTMLDivElement>(null)
    const photo = useRef<HTMLImageElement>(null)
    const previewWrapper = useRef<HTMLDivElement>(null)

    const setMouseColor = useContext(setMouseFollowerColorContext)

    const [result, sendPhoto] = usePostPhoto()

    //on image post result
    useEffect(() => {
        setLoading(false)
        if (result === undefined) return
        //success
        else if (result === 'success') {
            setMessage({ color: 'green', content: 'success! you can post another photo' })
            if (photoName) {
                onSent(photoName)
            }
        }
        else setMessage({ color: 'red', content: result })
    }, [result])


    //get the image's most common color
    useEffect(() => {
        if (photo.current === null) return
        photo.current.onload = () => {
            if (photo.current === null || setMouseColor === null) return
            const color = getDominatingColor(photo.current)
            setMouseColor(color)
        }
    }, [previewSrc])

    //view selected
    const onSelect = () => {
        if (fileInput.current === null) return
        const file = fileInput.current.files
        if (file === null) return
        const fReader = new FileReader()
        fReader.readAsDataURL(file[0])
        fReader.onloadend = (event) => {
            if (typeof event.target?.result == 'string') {
                //set preview file
                setPreviewSrc(event.target?.result)
            }
        }
    }

    //on enter press
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') postFile()
    }

    //on POST button click
    const postFile = async () => {

        //check if ready to send
        if (titleInput.current === null || previewWrapper.current === null) return
        if (previewSrc === null || photo.current === null) {
            setMessage({ color: 'red', content: 'choose a photo' })
            return
        }
        const name = titleInput.current.value
        if (name === '') {
            setMessage({ color: 'red', content: 'provide a title' })
            return
        }
        else if (name.includes(' ')) {
            setMessage({ color: 'red', content: 'name cannot include space' })
            return
        }

        //start sending
        setLoading(true)
        setMessage({ color: '', content: '' })

        const file = await createPhotoFile(previewSrc, name, photoPosition, photo.current, previewWrapper.current)

        //send photo - followed by rerender
        setPhotoName(name)
        sendPhoto(name, file)
    }

    return <>
        <div className="post-photo-form" ref={wrapper}>
            <input type="file" className="file" ref={fileInput} onChange={onSelect} />
            <h1>Post Photo</h1>
            <Preview
                previewFile={previewSrc}
                fileInput={fileInput}
                photoPosition={photoPosition}
                setPhotoPosition={setPhotoPosition}
                photo={photo}
                wrapper={previewWrapper}
                loading={loading}
            />
            <CustomInput type='text' label='photo title' reference={titleInput} onKeyDown={onKeyDown} />
            <CustomButton loading={loading} text={buttonText} whenClicked={postFile} />
            <p className={message.content === '' ? '' : 'message'} style={{ height: '2.5rem', color: message.color }}>{message.content}</p>
        </div>
    </>

}