import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import PublicGallery from "./pages/publicGallery/publicGallery";
import PostPhoto from "./pages/postPhoto/postPhoto";

export default function App() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/publicGallery" element={<PublicGallery />} />
            <Route path="/postPhoto" element={<PostPhoto />} />
        </Routes>
    )

}