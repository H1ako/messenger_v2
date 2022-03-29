// styles
import './Sidebar.scss'
// global dependencies
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useRecoilValue } from 'recoil';
// recoil atoms
import { userInfoState } from '../../recoil/UserAtom';
// libs
import { useSidebarLinks } from '../../libs/useSidebarLinks'
import { customFetch } from '../../libs/customFetch';

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation()
    const navLinks = useSidebarLinks(location.pathname)
    const [isActive, setIsActive] = useState(false)
    const userInfo = useRecoilValue(userInfoState)
    
    const signOut = () => {
        customFetch('/sign-out', 'POST')
        .then(response => response.json())
        .then((response) => {
            if (response.error) {
                console.log(response.error)
                return
            }
            if (response.url) {
                navigate(response.url);
            }
        })
    }
    return (
        <div className={`sidebar${isActive ? ' active' : ''}`}>
            <div className="sidebar__userInfo">
                <img src={userInfo.picture} alt="user pic"/>
                <h3>{`${userInfo.name} ${userInfo.surname}`}</h3>
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