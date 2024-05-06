import { useNavigate } from "react-router-dom";
import CustomButton from "../common/customButton/customButton";
import CanvasBackground from "../common/canvasBackground/canvasBackground";
import MouseFollower from "../common/mouseFollower/mouseFollower";
import useFetchTags from "../../net/get data/fetchTags";
import Comments from "./comments";

export default function PhotoInfo({ author, photo_name, mouse_color }:
    { author: string, photo_name: string, mouse_color: string }) {

    const navigate = useNavigate()
    const tags = useFetchTags(photo_name, author)

    const authorDetails = () => {
        navigate("/publicGallery")
    }

    return <div className="photo-info">

        <CanvasBackground color="#3f3f3f8f" />
        <MouseFollower color={mouse_color} />
        {author === "anonymous" ? null :
            <div className="author-details">
                <h2>Author's Profile:</h2>
                <CustomButton text={author + "'s gallery"} color={mouse_color} justText whenClicked={authorDetails} text_size={1.5} />
                <h2>Tags:</h2>
                <p className="tags">
                    {tags.length == 0 ? <span style={{ fontStyle: "italic" }}>no tags</span> : tags.map((el) => {
                        return "#" + el + " "
                    })}
                </p>
            </div>
        }
        <Comments photo_name={photo_name} author={author} />
    </div>

}