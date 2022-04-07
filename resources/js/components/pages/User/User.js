// styles
import './User.scss'
// global dependencies
import { useParams } from "react-router-dom"

// User page
function User() {
    const { userId } = useParams()
    // const userInfo = useRecoilValue(userInfoState)

    return (
        <div className="page userPage">
            {userId}
        </div>
    )
}

export default User