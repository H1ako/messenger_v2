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
    if (type === 'chatMembers') {
        return (
            <div className="searchResults">
                <ul>
                    {searchResults.map(result => (
                        <SearchResultChatMember
                            key={`chatMember-${result.id}`}
                            friendId={result.friend_id || result.friend?.id || result.id}
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
                            key={`user-${result.id}`}
                            friendId={result.friend_id || result.aboutRelationship?.friend_id || result.id}
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
                            key={`chat-${result.id}`}
                            chatId={result.id}
                            type={result.chat_type}
                            name={result.name}
                            pic={result.picture}
                            lastMessage={result.last_message}
                            companion={result.companion}
                            lastMessageSender={result.last_message_sender}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}

export default SearchResults