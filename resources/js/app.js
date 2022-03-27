// global dependencies\
import ReactDOM from 'react-dom'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
// components
import Sidebar from './components/Sidebar/Sidebar.js'
import Home from './components/pages/Home/Home.js'
import Chats from './components/pages/Chats/Chats.js'
import Chat from './components/pages/Chat/Chat.js'
import NewGroupchat from './components/pages/NewGroupchat/NewGroupchat.js'
import Login from './components/pages/Login/Login.js'

function App() {
    return (
        <div className='app'>
            <BrowserRouter>
                <Sidebar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/chats" element={<Chats />} />
                        <Route path="/chats/:id" element={<Chat />} />
                        <Route path="/new-groupchat" element={<NewGroupchat />} />
                        <Route path="/login/*" element={<Login />} />
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