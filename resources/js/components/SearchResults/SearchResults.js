// styles
import './SearchResults.scss'
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
                            key={result.user_id}
                            userId={result.user_id}
                            username={`${result.friend.name} ${result.friend.surname}`}
                            picture={result.friend.picture}
                            relationship={result.relationship}
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
                            key={result.user_id}
                            userId={result.user_id}
                            username={`${result.friend.name} ${result.friend.surname}`}
                            picture={result.friend.picture}
                            relationship={result.relationship}
                            requestFrom={result.request_from}
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
                            companion={result.companion[0]}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}

export default SearchResults