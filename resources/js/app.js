// styles
import './sass/app.scss'
// global dependencies
import ReactDOM from 'react-dom'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
// components
import Sidebar from './components/Sidebar/Sidebar.js'
import Home from './components/Home/Home.js'
import Friends from './components/Friends/Friends.js'

function App() {
    return (
        <div className='app'>
            <BrowserRouter>
                <Sidebar/>
                <main>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/friends" element={<Friends/>} />
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