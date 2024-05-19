import { useContext, useEffect, useRef, useState } from "react"
import './photoDetails.less'
import useFetchComments from "../../net/get data/fetchComments"
import Comment from "./comment"
import WriteComment from "./writeComment"
import { photoDataContext } from "../../contexts"
import { commentContentContext, setCommentContentContext } from "../../contexts"


export default function Comments() {

    const [editID, setEditID] = useState<number | null>(null)
    const [write_top_shift, setWriteTopShift] = useState<number>(0)
    const [written_comment_content, setWrittenCommentContent] = useState<string>("")

    const wrapper_ref = useRef<HTMLDivElement>(null)

    const [comments, loadComments] = useFetchComments()

    const photo_data = useContext(photoDataContext)
    if (photo_data === null) return null
    const [author, photo_name] = [photo_data.author_name, photo_data.photo_name]

    const reloadComments = () => {
        loadComments(photo_name, author)
    }

    useEffect(() => {
        reloadComments()
        window.onscroll = calcWriteCommentPosition
    }, [])

    const calcWriteCommentPosition = () => {
        if (wrapper_ref.current === null) return
        setWriteTopShift(-(wrapper_ref.current.getBoundingClientRect().bottom - window.innerHeight))
    }

    return <setCommentContentContext.Provider value={setWrittenCommentContent}>
        <commentContentContext.Provider value={written_comment_content}>

            <div className="comments-wrapper" ref={wrapper_ref} style={{ borderTop: author === "anonymous" ? "none" : "2px dashed black" }}>
                <h2>comments:</h2>
                <div className="comments">
                    {
                        comments.length === 0 ? <p className="no-comments">No comments yet... You can be the first to comment this artwork!</p> :
                            comments.map((el) => {
                                return <Comment
                                    key={el.id}
                                    author={el.author}
                                    content={el.content}
                                    id={el.id}
                                    reloadComments={reloadComments}
                                    setEditID={setEditID}
                                />
                            })
                    }
                </div>
                <WriteComment setEditID={setEditID} top_shift={write_top_shift} editID={editID} author={author} photo_name={photo_name} reloadComments={reloadComments} />
            </div>

        </commentContentContext.Provider>
    </setCommentContentContext.Provider>

}