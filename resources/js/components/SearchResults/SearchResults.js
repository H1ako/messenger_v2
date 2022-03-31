// styles
import './SearchResults.scss'
// global dependencies
import { useRecoilValue } from 'recoil'
// recoil atoms
import { userInfoState } from '../../recoil/UserAtom'
// components
import SearchResultUser from './SearchResultUser'
import SearchResultChat from './SearchResultChat'
import SearchResultChatMember from './SearchResultChatMember'

function SearchResults({ type, searchResults }) {
    const userInfo = useRecoilValue(userInfoState);

    if (type === 'chatMembers') {
        return (
            <div className="searchResults">
                <ul>
                    {searchResults.map(result => (
                        <SearchResultChatMember
                            key={result.friend_id || result.aboutRelationship?.friend_id}
                            userId={userInfo.id}
                            username={`${result.friend?.name || result.name} ${result.friend?.surname || result.surname}`}
                            picture={result.friend?.picture || result.picture}
                        />
                    ))}
                </ul>
            </div>
        )
    }
    
    if (type === 'users') {        
        return (
            <div className="searchResults">
                <ul>
                    {searchResults.map(result => (
                        <SearchResultUser
                            key={result.friend_id || result.aboutRelationship?.friend_id}
                            userId={userInfo.id}
                            username={`${result.friend?.name || result.name} ${result.friend?.surname || result.surname}`}
                            picture={result.friend?.picture || result.picture}
                            relationship={result.relationship || result.aboutRelationship?.relationship || 'no'}
                            requestFrom={result.request_from || result.aboutRelationship?.request_from}
                        />
                    ))}
                </ul>
            </div>
        )
    }

    if (type === 'chats') {
        return (
            <div className="searchResults">
                <ul>
                    {searchResults.map(result => (
                        <SearchResultChat
                            key={result.id}
                            chatId={result.id}
                            type={result.chat_type}
                            name={result.name}
                            pic={result.picture}
                            lastMessage={result.last_message}
                            companion={result.companion?.[0]}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}

export default SearchResults