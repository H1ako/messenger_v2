// styles
import './SearchResults.scss'
// components
import SearchResultUser from './SearchResultUser'
import SearchResultChat from './SearchResultChat'
import SearchResultChatMember from './SearchResultChatMember'

function SearchResults({type}) {

    if (type === 'chatMembers') {
        const searchResults = [
            {
                userId: 2,
                username: 'Dima',
                pic: '/assets/ava.png',
                relationship: 'friend'
            },
            {
                userId: 23,
                username: 'Dima',
                pic: '/assets/ava.png',
                relationship: 'friend'
            },
            {
                userId: 24,
                username: 'Dima',
                pic: '/assets/ava.png',
                relationship: 'friend'
            },
            {
                userId: 25,
                username: 'Dima',
                pic: '/assets/ava.png',
                relationship: 'friend'
            },
            {
                userId: 26,
                username: 'Dima',
                pic: '/assets/ava.png',
                relationship: 'friend'
            },
            {
                userId: 27,
                username: 'Dima',
                pic: '/assets/ava.png',
                relationship: 'friend'
            },
            {
                userId: 28,
                username: 'Dima',
                pic: '/assets/ava.png',
                relationship: 'friend'
            },
        ]
        
        return (
            <div className="searchResults">
                <ul>
                    {searchResults.map(result => (
                        <SearchResultChatMember
                            key={result.userId}
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
            },
            {
                userId: 6,
                username: 'Vanya',
                pic: '/assets/ava.png',
                relationship: 'request',
                requestFrom: 5,
            },
            {
                userId: 7,
                username: 'Vanya',
                pic: '/assets/ava.png',
                relationship: 'request',
                requestFrom: 5,
            },
            {
                userId: 8,
                username: 'Vanya',
                pic: '/assets/ava.png',
                relationship: 'request',
                requestFrom: 5,
            },
            {
                userId: 9,
                username: 'Vanya',
                pic: '/assets/ava.png',
                relationship: 'request',
                requestFrom: 5,
            },
            {
                userId: 10,
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
                lastMessage: 'heossssssddddddddddddddddddddsooo',
                lastMessageFromName: 'Vova',
                lastMessageFromPic: '/assets/ava.png'
            },
            {
                chatId: 6,
                chatType: 'groupChat',
                chatName: 'sosaichi',
                pic: '/assets/ava.png',
                lastMessage: 'heossssssddddddddddddddddddddsooo',
                lastMessageFromName: 'Vova',
                lastMessageFromPic: '/assets/ava.png'
            },
            {
                chatId: 7,
                chatType: 'dialog',
                chatName: 'Vova',
                pic: '/assets/ava.png',
                lastMessage: 'heoooo',
            },
            {
                chatId: 8,
                chatType: 'groupChat',
                chatName: 'sosaichi',
                pic: '/assets/ava.png',
                lastMessage: 'heosssssssooo',
                lastMessageFromName: 'Vova',
                lastMessageFromPic: '/assets/ava.png'
            },
            {
                chatId: 9,
                chatType: 'groupChat',
                chatName: 'sosaichi',
                pic: '/assets/ava.png',
                lastMessage: 'heosssssssooo',
                lastMessageFromName: 'Vova',
                lastMessageFromPic: '/assets/ava.png'
            },
            {
                chatId: 10,
                chatType: 'dialog',
                chatName: 'Vova',
                pic: '/assets/ava.png',
                lastMessage: 'heoooo',
            },
            {
                chatId: 11,
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