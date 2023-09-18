import { useNavigate } from "react-router-dom"

export default function PublicGallery() {

    const navigate = useNavigate()

    return <>
        <h1>PUBLIC GALLERY</h1>
        <button onClick={() => navigate('/')}>go back to login</button>
    </>

}