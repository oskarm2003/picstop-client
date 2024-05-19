import { useNavigate } from "react-router-dom";
import CustomButton from "../common/customButton/customButton";
import useFetchTags from "../../net/get data/fetchTags";
import Comments from "./comments";
import getCookie from "../../getCookie";
import useDeletePhoto from "../../net/remove resources/deletePhoto";
import { useContext, useEffect } from "react";
import { photoDataContext } from "../../contexts";

export default function PhotoInfo() {

    const photo_data = useContext(photoDataContext)
    if (photo_data === null) return null
    const [author, photo_name] = [photo_data.author_name, photo_data.photo_name]

    //get logged user
    const username = getCookie('username')
    const [delete_response, deletePhoto] = useDeletePhoto()

    const navigate = useNavigate()
    const tags = useFetchTags(photo_name, author)

    const authorDetails = () => {
        navigate("/gallery/@" + author)
    }

    const onDeletePress = () => {
        if (confirm("are you sure you want to delete this photo? (action is not reversable)")) {
            deletePhoto(author, photo_name)
        }
    }

    useEffect(() => {
        if (delete_response === "success") navigate("/gallery")
        else if (delete_response === "unauthorized") alert("you are not authorized to perform this action")
        else if (delete_response === "error") alert("error")
    }, [delete_response])

    return <div className="photo-info">

        {author === "anonymous" ? null :
            <div className="author-details">
                <h2>artwork details:</h2>
                <p className="tags">
                    {tags.map((el) => {
                        return "#" + el + " "
                    })}
                </p>
                <div className="buttons">
                    <CustomButton text={`☞ visit ${author}'s gallery`} color="#8f8fff" justText whenClicked={authorDetails} />
                    {
                        username === author ?
                            <CustomButton justText color="red" text="delete photo" whenClicked={onDeletePress} />
                            :
                            null
                    }
                </div>
            </div>
        }
        <Comments />
    </div>

}