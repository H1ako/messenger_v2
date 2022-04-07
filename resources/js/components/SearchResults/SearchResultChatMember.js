// global dependencies
import { useRecoilState } from "recoil"
// recoil atoms
import { newChatMembersIdsState } from "../../recoil/NewChatAtom"
// libs
import { getArrayWithoutElement } from "../../libs/getArrayWithoutElement"

function SearchResultChatMember({
    friendId,
    username,
    picture,
}) {
    const [chatMembers, setChatMembers] = useRecoilState(newChatMembersIdsState)

    const handleChange = (e) => {
        if (chatMembers.includes(friendId)) {
            const arrayWithoutUserId = getArrayWithoutElement(chatMembers, friendId)
            setChatMembers(arrayWithoutUserId)
            return
        }
        setChatMembers([...chatMembers, friendId])
    }

    return (
        <li className='searchResultUser'>
            <span className='userInfo'>
                <img src={picture}/>
                <h2>{username}</h2>
            </span>
            <span className="btns">
                <input checked={chatMembers.includes(friendId) ? true : false} onChange={handleChange} type="checkbox" id={`user-${friendId}`} />
                <label htmlFor={`user-${friendId}`} />
            </span>
        </li>
    )
}

export default SearchResultChatMember