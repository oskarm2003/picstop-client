import './tagsForm.less'

export default function TagsForm({ photoName, subtitleColor }:
    { photoName: string, subtitleColor: string }) {

    return <div className="tags-form">
        <h1>Add Tags</h1>
        <h2 style={{ color: subtitleColor }}>{photoName}</h2>
    </div>

}