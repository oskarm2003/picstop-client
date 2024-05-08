import { useEffect } from "react"
import getCookie from "../../getCookie"
import useDeleteComment from "../../net/remove resources/deleteComment"
import CustomButton from "../common/customButton/customButton"

export default function Comment({ author, content, id, reloadComments, setText, setEditID }:
    { author: string, content: string, id: number, reloadComments: () => void, setText: (text: string) => void, setEditID: React.Dispatch<React.SetStateAction<number | null>> }) {

    const username = getCookie("username")
    const [delete_result, deleteComment] = useDeleteComment()

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
        setText(content)
    }


    return <div className="comment">
        <p>
            <b>{author}: {author === username ? "(you)" : ""}</b>
            {username === author ?
                <>
                    <CustomButton text="edit" whenClicked={editComment} justText color="white" />
                    <CustomButton text="remove" whenClicked={removeComment} justText color="white" />
                </>
                : null}
            <br />{content}
        </p>
    </div>

}