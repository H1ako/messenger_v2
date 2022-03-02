// styles
import '../sass/app.scss'
// global dependencies
import ReactDOM from 'react-dom'
// components
import Router from './router'
import Sidebar from './components/Sidebar/Sidebar.js'

function App() {
    return (
        <div>
            <Sidebar/>
            <Router/>
        </div>
    )
}

export default App

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'))
}