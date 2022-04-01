// global dependencies
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import './bootstrap.js'
// components
import Main from './main.js'

function App() {    
    return (
        <div className='app'>
            <BrowserRouter>
                <RecoilRoot>
                    <Main />
                </RecoilRoot>
            </BrowserRouter>
        </div>
    )
}

export default App

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'))
}