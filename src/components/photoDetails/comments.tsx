import { useEffect, useRef, useState } from "react"
import usePostComment from "../../net/post resources/postComment"
import CustomButton from "../common/customButton/customButton"
import './photoDetails.less'
import useFetchComments from "../../net/get data/fetchComments"
import Comment from "./comment"

export default function Comments({ photo_name, author }:
    { photo_name: string, author: string }) {

    const [loading, response, postComment] = usePostComment()
    const comment_ref = useRef<HTMLTextAreaElement>(null)

    const [comments, loadComments] = useFetchComments()

    type t_message = { content: string, color: string }
    const [message, setMessage] = useState<t_message | null>(null)


    // on post comment response
    useEffect(() => {
        loadComments(photo_name, author)
        if (response === null) return
        else if (response === 'success') {
            setMessage({ color: "green", content: "success" })
            if (comment_ref.current != null) { comment_ref.current.value = "" }
        }
        else if (response === 'authorization failed') {
            setMessage({ color: "red", content: "authorization failed" })
        }
        else {
            setMessage({ color: "red", content: "error" })
        }

    }, [response])

    // on send button click
    const sendComment = () => {
        if (comment_ref.current === null) return
        const comment_content = comment_ref.current.value
        if (comment_content.trim() === "") {
            setMessage({ color: "red", content: "empty comment" })
            return
        }
        postComment(author, photo_name, comment_content)
    }

    return <div className="comments-wrapper">
        <div className="comments">
            <h2 style={{ textAlign: "center" }}>comments:</h2>
            {comments.map((el) => {
                return <Comment key={el.id} author={el.author} content={el.content} id={el.id} />
            })}
        </div>

        <div className="write-comment">
            <textarea ref={comment_ref} placeholder="leave a comment!" />
            <div>
                {message?.content != "" ? <p style={{ color: message?.color }}>{message?.content}</p> : null}
                <CustomButton text="send" whenClicked={sendComment} loading={loading} />
            </div>
        </div>
    </div>
}