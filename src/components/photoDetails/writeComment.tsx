import { useContext, useEffect, useRef, useState } from "react"
import usePatchComment from "../../net/post resources/patchComment"
import usePostComment from "../../net/post resources/postComment"
import CustomButton from "../common/customButton/customButton"
import getCookie from "../../getCookie"
import { useNavigate } from "react-router-dom"
import { commentContentContext } from "../../contexts"

const MAX_COMMENT_LEN = 512

export default function WriteComment({ top_shift, author, photo_name, reloadComments, editID, setEditID }:
    { top_shift: number, author: string, photo_name: string, reloadComments: () => void, editID: number | null, setEditID: React.Dispatch<React.SetStateAction<number | null>> }
) {

    const comment_content = useContext(commentContentContext)
    const navigate = useNavigate()

    type t_message = { content: string, color: string }
    const [message, setMessage] = useState<t_message>({ color: "gray", content: "status" })
    const [comment_length, setCommentLength] = useState(0)

    const [loading, response, postComment] = usePostComment()
    const [edit_response, edit_loading, editComment] = usePatchComment()

    const comment_ref = useRef<HTMLTextAreaElement>(null)

    // on editID change
    useEffect(() => {
        if (comment_ref.current === null || editID === null) return
        comment_ref.current.value = ""
        comment_ref.current.focus()
        setCommentLength(comment_ref.current.value.length)
    }, [editID])

    // on comment content change
    useEffect(() => {
        if (comment_ref.current === null) return
        comment_ref.current.value = comment_content
        setCommentLength(comment_ref.current.value.length)
    }, [comment_content])

    // on post comment response
    useEffect(() => {
        if (response === null) return
        else if (response === 'success') {
            setMessage({ color: "green", content: "success" })
            if (comment_ref.current != null) {
                comment_ref.current.value = ""
                setCommentLength(0)
            }
            reloadComments()
        }
        else if (response === 'authorization failed') setMessage({ color: "red", content: "authorization failed" })
        else if (response === 'conflict') setMessage({ color: "red", content: "one comment per user allowed" })
        else if (response === 'not found') setMessage({ color: "red", content: "photo not found" })
        else if (response === 'not signed in') setMessage({ color: "red", content: "sign in" })
        else setMessage({ color: "red", content: "error" })
    }, [response])

    // on edit comment response
    useEffect(() => {
        if (edit_response === null) return
        else if (edit_response === 'success') {
            setMessage({ color: "green", content: "success" })
            if (comment_ref.current != null) {
                comment_ref.current.value = ""
                setCommentLength(0)
            }
            reloadComments()
        }
        else if (edit_response === "not found") setMessage({ color: "red", content: "comment not found" })
        else if (edit_response === 'unauthorized') setMessage({ color: "red", content: "authorization failed" })
        else setMessage({ color: "red", content: "error" })
    }, [edit_response])

    // on send button click
    const sendComment = () => {
        if (comment_ref.current === null) return
        const comment_content = comment_ref.current.value
        if (comment_content.trim() === "") {
            setMessage({ color: "red", content: "empty comment" })
            return
        }

        if (comment_length > MAX_COMMENT_LEN) {
            setMessage({ color: "red", content: "comment too long" })
            return
        }

        if (editID === null)
            postComment(author, photo_name, comment_content)
        else
            editComment(editID, comment_content)

        setEditID(null)

    }

    const updateCommentLen = () => {
        if (comment_ref.current === null) return
        setCommentLength(comment_ref.current.value.length)
    }

    if (getCookie("username")) {
        return <div className="write-comment" style={{ top: top_shift + "px" }}>
            <textarea onKeyUp={updateCommentLen} ref={comment_ref} placeholder={editID != null ? "edit the comment" : "leave a comment!"} />
            <div>
                <p style={{ color: message?.color }}>{message?.content}</p>
                <p style={{ color: comment_length > MAX_COMMENT_LEN ? "red" : "black" }} >{comment_length}/{MAX_COMMENT_LEN}</p>
                <CustomButton text={editID != null ? "edit" : "send"} whenClicked={sendComment} loading={loading && edit_loading} />
            </div>
        </div>
    }
    else {
        return <div className="write-comment no-login" style={{ top: top_shift + "px" }}>
            <p>log in to leave a comment!</p>
            <CustomButton text="log in" whenClicked={() => navigate("/")} />
        </div>
    }


}