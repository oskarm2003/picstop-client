import { useContext, useEffect } from "react"
import getCookie from "../../getCookie"
import useDeleteComment from "../../net/remove resources/deleteComment"
import CustomButton from "../common/customButton/customButton"
import { photoDataContext, setCommentContentContext } from "../../contexts"

export default function Comment({ author, content, id, reloadComments, setEditID }:
    { author: string, content: string, id: number, reloadComments: () => void, setEditID: React.Dispatch<React.SetStateAction<number | null>> }) {

    const username = getCookie("username")
    const [delete_result, deleteComment] = useDeleteComment()

    const setWrittenCommentContent = useContext(setCommentContentContext)

    const photo_data = useContext(photoDataContext)
    if (photo_data === null) return null
    const photo_author = photo_data.author_name

    //on delete comment result
    useEffect(() => {
        if (delete_result === "success") {
            reloadComments()
        }
        else if (delete_result === "error") {
            alert("could not delete the photo")
        }
    }, [delete_result])

    const removeComment = () => {
        if (confirm("are you sure you want to remove this comment?"))
            deleteComment(id)
    }

    const editComment = () => {
        setEditID(id)
        if (setWrittenCommentContent === null) return
        setWrittenCommentContent(content)
    }


    return <div className="comment">
        <p>
            <b>{author}: {author === username ? "(you)" : (author === photo_author ? "(author)" : "")}</b>
            {username === author ?
                <>
                    <CustomButton text_size={1} text="edit" whenClicked={editComment} justText color="#5f5fff" />
                    <CustomButton text_size={1} text="remove" whenClicked={removeComment} justText color="red" />
                </>
                : null}
            <br />{content}
        </p>
    </div>

}