import './postPhoto.less'

import { useEffect, useRef, useState } from "react";
import PostPhotoForm from "../../components/postPhoto/postPhotoForm/postPhotoForm";
import TagsForm from "../../components/postPhoto/tagsForm/tagsForm";
import CustomButton from '../../components/common/customButton/customButton';
import { useNavigate } from 'react-router-dom';
import CanvasBackground from '../../components/common/canvasBackground/canvasBackground';
import MouseFollower from '../../components/common/mouseFollower/mouseFollower';
import { setMouseFollowerColorContext } from '../../contexts';

export default function PostPhoto() {

    const [display, setDisplay] = useState<'file' | 'tags'>('file')
    const [postedPhotoName, setPostedPhotoName] = useState('')
    const [container, setContainer] = useState<HTMLDivElement | null>(null)
    const [mouseFollowerColor, setMouseFollowerColor] = useState<undefined | string>()

    const containerRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    //load the container
    useEffect(() => {
        if (containerRef.current === null) return
        setContainer(containerRef.current)
    })

    //change view
    const onPostSent = (photoName: string) => {
        setPostedPhotoName(photoName)
        setDisplay('tags')
    }

    return <div className='post-photo-wrapper'>
        <div className="post-photo" ref={containerRef}>
            {container != null &&
                <>
                    <CanvasBackground wrapper={container}></CanvasBackground>
                    <MouseFollower container={container} color={mouseFollowerColor} />
                </>
            }

            <setMouseFollowerColorContext.Provider value={setMouseFollowerColor}>
                {display === 'file' && <PostPhotoForm buttonText="proceed" onSent={onPostSent} />}
                {display === 'tags' && <TagsForm subtitleColor={mouseFollowerColor ? mouseFollowerColor : '#3f3f3f'} photoName={postedPhotoName} />}
            </setMouseFollowerColorContext.Provider>

        </div>
        <CustomButton text='back to browsing' whenClicked={() => navigate('/publicGallery')} justText color='white' ></CustomButton>
    </div>
}