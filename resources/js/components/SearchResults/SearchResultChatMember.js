// global dependencies
import { useRecoilState } from "recoil"
// recoil atoms
import { newChatMembersIdsState } from "../../recoil/NewChatAtom"
// libs
import { getArrayWithoutElement } from "../../libs/GetArrayWithoutElement"

function SearchResultChatMember({
    userId,
    username,
    picture,
}) {
    const [chatMembers, setChatMembers] = useRecoilState(newChatMembersIdsState)

    const handleChange = (e) => {
        if (chatMembers.includes(userId)) {
            const arrayWithoutUserId = getArrayWithoutElement(chatMembers, userId)
            setChatMembers(arrayWithoutUserId)
            return
        }
        setChatMembers([...chatMembers, userId])
    }

    return (
        <li className='searchResultUser'>
            <span className='userInfo'>
                <img src={picture}/>
                <h2>{username}</h2>
            </span>
            <span className="btns">
                <input checked={chatMembers.includes(userId) ? true : false} onChange={handleChange} type="checkbox" id={`user-${userId}`} />
                <label htmlFor={`user-${userId}`} />
            </span>
        </li>
    )
}

export default SearchResultChatMember