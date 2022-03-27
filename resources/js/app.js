// global dependencies\
import ReactDOM from 'react-dom'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
// components
import Sidebar from './components/Sidebar/Sidebar.js'
import Home from './components/pages/Home/Home.js'
import Chats from './components/pages/Chats/Chats.js'
import Chat from './components/pages/Chat/Chat.js'
import NewGroupchat from './components/pages/NewGroupchat/NewGroupchat.js'
import SignIn from './components/pages/SignIn/SignIn.js'
import SignUp from './components/pages/SignUp/SignUp.js'

function App() {
    return (
        <div className='app'>
            <BrowserRouter>
                <RecoilRoot>
                    <Sidebar />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/chats" element={<Chats />} />
                            <Route path="/chats/:id" element={<Chat />} />
                            <Route path="/new-groupchat" element={<NewGroupchat />} />
                            <Route path="/sign-in" element={<SignIn />} />
                            <Route path="/sign-up" element={<SignUp />} />
                        </Routes>
                    </main>
                </RecoilRoot>
            </BrowserRouter>
        </div>
    )
}

export default App

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'))
}