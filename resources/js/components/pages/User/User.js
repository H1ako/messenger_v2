// styles
import './User.scss'
// global dependencies
import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
// recoil atoms
import { userInfoState } from '../../../recoil/UserAtom'
import { currentLanguageAtom } from '../../../recoil/LanguageAtom'
// libs
import { customFetch } from '../../../libs/customFetch'
// components
import FriendActionBtns from '../../FriendActionBtns/FriendActionBtns'

// User page
function User() {
    const currentLanguage = useRecoilValue(currentLanguageAtom)
    const { userId } = useParams()
    const [user, setUser] = useState({})
    const userInfo = useRecoilValue(userInfoState)

    useEffect(() => {
        customFetch(`/api/user/${userId}`, "POST")
        .then(data => data.json())
        .then(data => {
            console.log(data)
            setUser(data.user)            
        })
    }, [userId])

    if (!userInfo.id) return <div className="page userPage" />

    if (userInfo.id == userId) {
        return (
            <div className="page userPage">
                <div className="userPage__leftSide">
                    <img src={user.picture} alt="" />
                </div>
                <div className="userPage__mainInfo">
                    <h1>{user.name && user.surname && `${user.name} ${user.surname}`}</h1>
                    <div className="mainInfo__numberData">
                        <div className="numberData__amount">
                            <div className="amount__name">
                                <ion-icon name="people-outline" />
                                <h2>{currentLanguage.keys?.friends}</h2>
                            </div>
                            <h3>{user.friendAmount}</h3>
                        </div>
                        <div className="numberData__amount">
                            <div className="amount__name">
                                <ion-icon name="people-circle-outline" />
                                <h2>{currentLanguage.keys?.requests}</h2>
                            </div>
                            <h3>{user.requestAmount}</h3>
                        </div>
                        <div className="numberData__amount">
                            <div className="amount__name">
                                <ion-icon name="chatbubble-ellipses-outline" />
                                <h2>{currentLanguage.keys?.groupchats}</h2>
                            </div>
                            <h3>{user.groupchatAmount}</h3>
                        </div>
                        <div className="numberData__amount">
                            <div className="amount__name">
                            <ion-icon name="chatbubbles-outline" />
                                <h2>{currentLanguage.keys?.dialogs}</h2>
                            </div>
                            <h3>{user.dialogAmount}</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="page userPage">
            <div className="userPage__leftSide">
                <img src={user.picture} alt="" />
                <FriendActionBtns
                    userId={userInfo.id}
                    friendId={user.id}
                    requestFrom={user.relationship?.request_from}
                    relationship={user.relationship ? user.relationship.relationship : 'no'}
                />
            </div>
            <div className="userPage__mainInfo">
                <h1>{user.name && user.surname && `${user.name} ${user.surname}`}</h1>
                <div className="mainInfo__numberData">
                    <div className="numberData__amount">
                        <div className="amount__name">
                            <ion-icon name="people-outline" />
                            <h2>{currentLanguage.keys?.friends}</h2>
                        </div>
                        <h3>{user.friendAmount}</h3>
                    </div>
                    <div className="numberData__amount">
                        <div className="amount__name">
                            <ion-icon name="people-circle-outline" />
                            <h2>{currentLanguage.keys?.requests}</h2>
                        </div>
                        <h3>{user.requestAmount}</h3>
                    </div>
                    <div className="numberData__amount">
                        <div className="amount__name">
                            <ion-icon name="chatbubbles-outline" />
                            <h2>{currentLanguage.keys?.groupchats}</h2>
                        </div>
                        <h3>{user.groupchatAmount}</h3>
                    </div>
                    <div className="numberData__amount">
                        <div className="amount__name">
                        <ion-icon name="chatbubbles-outline" />
                            <h2>{currentLanguage.keys?.dialogs}</h2>
                        </div>
                        <h3>{user.dialogAmount}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User