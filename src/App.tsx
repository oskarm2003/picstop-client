import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import LoginPanel from "./pages/LoginPanel";

export default function App() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPanel />} />
        </Routes>
    )

}