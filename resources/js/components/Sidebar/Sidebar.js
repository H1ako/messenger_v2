// styles
import './Sidebar.scss'
// global dependencies
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSidebarLinks } from '../../libs/useSidebarLinks'

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation()
    const navLinks = useSidebarLinks(location.pathname)
    const [isActive, setIsActive] = useState(false)

    const signOut = () => {
        fetch('/sign-out', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRF-Token': document.querySelector('meta[name="_token"]').getAttribute('content')
            }
        })
        .then(response => response.json())
        .then((response) => {
            if (response.url) {
                navigate(response.url);
            }
        })
    }
    
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
            <div onClick={signOut} className="sidebar__exit">
                <ion-icon name="exit-outline"></ion-icon>
                <h3>log out</h3>
            </div>
        </div>
    )
}

export default Sidebar