import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import PublicGallery from "./pages/publicGallery/publicGallery";

export default function App() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/publicGallery" element={<PublicGallery />} />
        </Routes>
    )

}