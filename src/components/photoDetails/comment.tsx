export default function Comment({ author, content, id }: { author: string, content: string, id: number }) {

    return <div className="comment">
        <p>
            <b>{author}:</b>{content}
        </p>
    </div>

}