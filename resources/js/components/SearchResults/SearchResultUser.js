// global dependencies
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// recoil atoms
import { userInfoState } from '../../recoil/UserAtom';
// libs
import { customFetch } from "../../libs/customFetch"
import FriendActionBtns from '../FriendActionBtns/FriendActionBtns';


function SearchResultUser({
    friendId,
    username,
    picture,
    relationship,
    requestFrom
}) {
    const navigate = useNavigate()
    const userInfo = useRecoilValue(userInfoState)

    const goToMessages = () => {
        customFetch(`/chat/check/${friendId}`, 'POST')
        .then(data => data.json())
        .then(data => {
            if (data.error) {
                return console.log(data.error)
            }

            if (data.url) {
                navigate(data.url)
            }
        })
    }

    if (!userInfo.id) {
        return (
            <li className='searchResultUser notLoaded'>
                <span className='userInfo'>
                    <img />
                    <h2>{username}</h2>
                </span>
                <span className="btns">
                    
                </span>
            </li>
        )
    }
    
    return (
        <li className='searchResultUser'>
            <span className='userInfo'>
                <Link to={`/user/${friendId}`} >
                    <img src={picture}/>
                </Link>
                <h2 onClick={goToMessages}>{username}</h2>
            </span>
            <span className="btns">
                <FriendActionBtns
                    userId={userInfo.id}
                    requestFrom={requestFrom}
                    relationship={relationship}
                    friendId={friendId}
                />
            </span>
        </li>
    )
}

export default SearchResultUser