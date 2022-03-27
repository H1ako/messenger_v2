// styles
import './Sidebar.scss'
// global dependencies
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useSidebarLinks } from '../../libs/useSidebarLinks'

function Sidebar() {
    const location = useLocation()
    const navLinks = useSidebarLinks(location.pathname)
    const [isActive, setIsActive] = useState(false)
    
    return (
        <div className={`sidebar${isActive ? ' active' : ''}`}>
            <div className="sidebar__userInfo">
                <img src='/assets/ava.png' alt="user pic"/>
                <h3>Nikita Sobolev</h3>
            </div>
            <nav>
                <ul>
                    <li className='menuBtn' onClick={() => setIsActive(!isActive)}>
                        <ion-icon name="menu-outline"></ion-icon>
                        <h3>menu</h3>
                    </li>
                    {navLinks.map(link => 
                        <li key={link.pathname} className={`${location.pathname == link.pathname ? 'active' : ''}`}>
                            <Link to={link.pathname}>
                                <ion-icon name={link.icon}></ion-icon>
                                <h3>{link.name}</h3>
                            </Link>
                        </li>
                    )}
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