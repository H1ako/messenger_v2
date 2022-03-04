// global dependencies
import ReactDOM from 'react-dom'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
// components
import Sidebar from './components/Sidebar/Sidebar.js'
import Home from './components/pages/Home/Home.js'
import Friends from './components/pages/Friends/Friends.js'
import Chats from './components/pages/Chats/Chats.js'

function App() {
    return (
        <div className='app'>
            <BrowserRouter>
                <Sidebar/>
                <main>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/friends" element={<Friends/>} />
                        <Route path="/chats" element={<Chats/>} />
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    )
}

export default App

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'))
}