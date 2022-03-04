// styles
import SearchResultChat from './SearchResultChat'
import './SearchResults.scss'
// components
import SearchResultUser from './SearchResultUser'

function SearchResults({type}) {
    
    if (type === 'users') {
        const searchResults = [
            {
                userId: 3,
                username: 'Vova',
                pic: '/assets/ava.png',
                relationship: ''
            },
            {
                userId: 2,
                username: 'Dima',
                pic: '/assets/ava.png',
                relationship: 'friend'
            },
            {
                userId: 4,
                username: 'Ilya',
                pic: '/assets/ava.png',
                relationship: 'request',
                requestFrom: 1,
            },
            {
                userId: 5,
                username: 'Vanya',
                pic: '/assets/ava.png',
                relationship: 'request',
                requestFrom: 5,
            }
        ]
        
        return (
            <div className="searchResults">
                <ul>
                    {searchResults.map(result => (
                        <SearchResultUser
                            key={result.userId}
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
        const searchResults = [
            {
                chatId: 3,
                chatType: 'dialog',
                chatName: 'Vova',
                pic: '/assets/ava.png',
                lastMessage: 'heoooo',
            },
            {
                chatId: 2,
                chatType: 'groupChat',
                chatName: 'sosaichi',
                pic: '/assets/ava.png',
                lastMessage: 'heosssssssooo',
                lastMessageFromName: 'Vova',
                lastMessageFromPic: '/assets/ava.png'
            },
            {
                chatId: 4,
                chatType: 'dialog',
                chatName: 'Vova',
                pic: '/assets/ava.png',
                lastMessage: 'heoooo',
            },
            {
                chatId: 5,
                chatType: 'groupChat',
                chatName: 'sosaichi',
                pic: '/assets/ava.png',
                lastMessage: 'heosssssssooo',
                lastMessageFromName: 'Vova',
                lastMessageFromPic: '/assets/ava.png'
            }
        ]

        return (
            <div className="searchResults">
                <ul>
                    {searchResults.map(result => (
                        <SearchResultChat
                            key={result.chatId}
                            chatId={result.chatId}
                            type={result.chatType}
                            name={result.chatName}
                            pic={result.pic}
                            lastMessage={result.lastMessage}
                            lastMessageFromName={result.lastMessageFromName}
                            lastMessageFromPic={result.lastMessageFromPic}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}

export default SearchResults