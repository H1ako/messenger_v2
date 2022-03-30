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
                            key={result.id}
                            userId={result.userId}
                            username={result.username}
                            pic={result.pic}
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
                            key={result.id}
                            userId={result.userId}
                            username={result.username}
                            pic={result.pic}
                            relationship={result.relationship}
                            requestFrom={result.requestFrom}
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
                        console.log(result.companion),
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