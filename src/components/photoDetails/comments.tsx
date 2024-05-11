import { useEffect, useRef, useState } from "react"
import usePostComment from "../../net/post resources/postComment"
import CustomButton from "../common/customButton/customButton"
import './photoDetails.less'
import useFetchComments from "../../net/get data/fetchComments"
import Comment from "./comment"
import getCookie from "../../getCookie"
import usePatchComment from "../../net/post resources/patchComment"

export default function Comments({ photo_name, author }:
    { photo_name: string, author: string }) {

    const [loading, response, postComment] = usePostComment()
    const [edit_response, edit_loading, editComment] = usePatchComment()
    const [comments, loadComments] = useFetchComments()

    type t_message = { content: string, color: string }
    const [message, setMessage] = useState<t_message | null>(null)
    const [editID, setEditID] = useState<number | null>(null)

    const comment_ref = useRef<HTMLTextAreaElement>(null)
    const username = getCookie("username")

    const reloadComments = () => {
        loadComments(photo_name, author)
    }

    useEffect(() => {
        reloadComments()
    }, [])

    // on post comment response
    useEffect(() => {
        if (response === null) return
        else if (response === 'success') {
            setMessage({ color: "green", content: "success" })
            if (comment_ref.current != null) { comment_ref.current.value = "" }
            reloadComments()
        }
        else if (response === 'authorization failed') setMessage({ color: "red", content: "authorization failed" })
        else setMessage({ color: "red", content: "error" })
    }, [response])

    // on edit comment response
    useEffect(() => {
        if (edit_response === null) return
        else if (edit_response === 'success') {
            setMessage({ color: "green", content: "success" })
            if (comment_ref.current != null) { comment_ref.current.value = "" }
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

        if (editID === null)
            postComment(author, photo_name, comment_content)
        else
            editComment(editID, comment_content)
    }

    // set the content of comment editor
    const setText = (text: string) => {
        if (comment_ref.current === null) return
        comment_ref.current.value = text
        comment_ref.current.focus()
    }

    return <div className="comments-wrapper">
        <h2>comments:</h2>
        <div className="comments">
            {
                comments.length === 0 ? <p className="no-comments">no comments yet</p> :
                    comments.map((el) => {
                        return <Comment
                            key={el.id}
                            author={el.author}
                            content={el.content}
                            id={el.id}
                            reloadComments={reloadComments}
                            setEditID={setEditID}
                            setText={setText}
                        />
                    })
            }
        </div>
        {username === undefined ? null :
            <div className="write-comment">
                <textarea ref={comment_ref} placeholder={editID != null ? "edit the comment" : "leave a comment!"} />
                <div>
                    {message?.content != "" ? <p style={{ color: message?.color }}>{message?.content}</p> : null}
                    <CustomButton text={editID != null ? "edit" : "send"} whenClicked={sendComment} loading={loading && edit_loading} />
                </div>
            </div>
        }
    </div>
}