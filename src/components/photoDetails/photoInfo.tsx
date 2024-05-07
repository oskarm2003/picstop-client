import { useNavigate } from "react-router-dom";
import CustomButton from "../common/customButton/customButton";
import CanvasBackground from "../common/canvasBackground/canvasBackground";
import MouseFollower from "../common/mouseFollower/mouseFollower";
import useFetchTags from "../../net/get data/fetchTags";
import Comments from "./comments";
import getCookie from "../../getCookie";
import useDeletePhoto from "../../net/remove resources/deletePhoto";
import { useEffect, useRef } from "react";

const default_dim = ["25vw", "25vh"]

export default function PhotoInfo({ author, photo_name, mouse_color, dimensions }:
    { author: string, photo_name: string, mouse_color: string, dimensions: [number, number] }) {

    const wrapper_ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const el = wrapper_ref.current
        if (el === null) return

        const ratio = window.innerWidth / window.innerHeight

        if (ratio < 1) {
            el.style.maxHeight = default_dim[1]
            el.style.maxWidth = dimensions[0] + 'px'
        }
        else {
            el.style.maxHeight = dimensions[1] + 'px'
            el.style.maxWidth = default_dim[0]
        }
    }, [dimensions])

    //get logged user
    const username = getCookie('username')
    const [delete_response, deletePhoto] = useDeletePhoto()

    const navigate = useNavigate()
    const tags = useFetchTags(photo_name, author)

    const authorDetails = () => {
        navigate("/publicGallery/@" + author)
    }

    const onDeletePress = () => {
        if (confirm("are you sure you want to delete this photo? (action is not reversable)")) {
            deletePhoto(author, photo_name)
        }
    }

    useEffect(() => {
        if (delete_response === "success") navigate("/publicGallery")
        else if (delete_response === "unauthorized") alert("you are not authorized to perform this action")
        else if (delete_response === "error") alert("error")
    }, [delete_response])

    return <div className="photo-info" ref={wrapper_ref}>

        <CanvasBackground color="#0000001f" />
        <MouseFollower color={mouse_color} />
        {author === "anonymous" ? null :
            <div className="author-details">
                {
                    username === author ?
                        <>
                            <h2 style={{ marginBottom: 0 }}>This work is your's</h2>
                            <CustomButton text="delete photo" whenClicked={onDeletePress} />
                        </>
                        :
                        <>
                            <h2>Author's Profile:</h2>
                            <CustomButton text={author + "'s gallery"} color="#af5f9f" justText whenClicked={authorDetails} text_size={1.5} />
                        </>

                }
                <h2>Tags:</h2>
                <p className="tags">
                    {tags.length == 0 ? <span className="italics">no tags</span> : tags.map((el) => {
                        return "#" + el + " "
                    })}
                </p>
            </div>
        }
        <Comments photo_name={photo_name} author={author} />
    </div>

}