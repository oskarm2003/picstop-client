import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import PublicGallery from "./pages/publicGallery/publicGallery";
import PostPhoto from "./pages/postPhoto/postPhoto";
import PhotoDetails from "./pages/photoDetails/photoDetails";

export default function App() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/publicGallery" element={<PublicGallery />} />
            <Route path="/postPhoto" element={<PostPhoto />} />
            <Route path="/details/:author/:filename" element={<PhotoDetails />} />
        </Routes>
    )

}