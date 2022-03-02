import { Routes, BrowserRouter, Route } from 'react-router-dom'
import Home from '../components/Home/Home.js'
import Friends from '../components/Friends/Friends.js'

function Router(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/friends" element={<Friends/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router