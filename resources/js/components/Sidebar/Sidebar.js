// styles
import './Sidebar.scss'
// global dependencies
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

function Sidebar() {
    const location = useLocation()
    const [isActive, setIsActive] = useState(false)

    return (
        <div
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
            className={`sidebar${isActive ? ' active' : ''}`}
        >
            <div className="sidebar__userInfo">
                <img src='/assets/ava.png' alt="user pic"/>
                <h3>Nikita Sobolev</h3>
            </div>
            <nav>
                <ul>
                    
                    <li className={`${location.pathname == '/' ? 'active' : ''}`}>
                        <Link to='/'>
                            <ion-icon name="home-outline"></ion-icon>
                            <h3>home</h3>
                        </Link>
                    </li>
                    <li className={`${location.pathname == '/chats' ? 'active' : ''}`}>
                        <Link to='/chats'>
                            <ion-icon name="chatbubbles-outline"></ion-icon>
                            <h3>chats</h3>
                        </Link>
                    </li>
                    <li className={`${location.pathname == '/friends' ? 'active' : ''}`}>
                        <Link to='/friends'>
                            <ion-icon name="people-outline"></ion-icon>
                            <h3>friends</h3>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="sidebar__exit">
                <ion-icon name="exit-outline"></ion-icon>
                <h3>log out</h3>
            </div>
        </div>
    )
}

export default Sidebar