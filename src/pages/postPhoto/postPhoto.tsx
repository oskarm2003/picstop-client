import './postPhoto.less'

import { useRef, useState } from "react";
import PostPhotoForm from "../../components/postPhoto/postPhotoForm/postPhotoForm";
import TagsForm from "../../components/postPhoto/tagsForm/tagsForm";
import CustomButton from '../../components/common/customButton/customButton';
import { useNavigate } from 'react-router-dom';
import CanvasBackground from '../../components/common/canvasBackground/canvasBackground';
import MouseFollower from '../../components/common/mouseFollower/mouseFollower';
import { setMouseFollowerColorContext } from '../../contexts';
import getCookie from '../../getCookie';

export default function PostPhoto() {

    const [display, setDisplay] = useState<'file' | 'tags'>('file')
    const [postedPhotoName, setPostedPhotoName] = useState('')
    const [mouseFollowerColor, setMouseFollowerColor] = useState<undefined | string>()

    const containerRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const username = getCookie("username")

    //change view
    const onPhotoSent = (photoName: string) => {
        //navigate to next screen
        let author = getCookie('username')
        if (author === undefined) {
            navigate('/details/anonymous/' + photoName)
            return
        }
        setPostedPhotoName(photoName)
        setDisplay('tags')
    }

    const onTagsSent = (photoName?: string) => {
        //navigate to next screen
        if (photoName === undefined) {
            navigate('/gallery')
            return
        }
        let author = getCookie('username')
        if (author === undefined) {
            author = 'anonymous'
        }
        navigate('/details/' + author + '/' + photoName)
    }

    return <div className='post-photo-wrapper'>
        <div className="post-photo" ref={containerRef}>

            <CanvasBackground />
            <MouseFollower color={mouseFollowerColor} />

            <setMouseFollowerColorContext.Provider value={setMouseFollowerColor}>
                {display === 'file' && <PostPhotoForm buttonText="proceed" onSent={onPhotoSent} />}
                {display === 'tags' && <TagsForm onPostSuccess={onTagsSent} subtitleColor={mouseFollowerColor ? mouseFollowerColor : '#3f3f3f'} photoName={postedPhotoName} />}
            </setMouseFollowerColorContext.Provider>

        </div>
        <CustomButton
            text='back to browsing'
            whenClicked={() => navigate('/gallery')}
            justText
            color='white'
        ></CustomButton>
        {username === undefined ?
            <p className='warning'>WARNING: Posting as guest user. <br />
                Photos posted as guest are beyond your control and you will not be able to delete or tag them.
                The author name is displayed as "anonymous".
                Anonymous work can get removed without notice.
            </p> : null
        }
    </div>
}