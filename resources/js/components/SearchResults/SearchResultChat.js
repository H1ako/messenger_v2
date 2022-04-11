import { Link } from "react-router-dom"

function SearchResultChat({
    chatId,
    type,
    pic,
    name,
    lastMessage,
    companion,
    lastMessageSender,
    isNew
}) {

    if (type === 'dialog') {
        return (
            <li className={`searchResultChat${isNew ? ' newMessage' : ''}`}>
                <Link to={`/user/${companion?.id}`} >
                    <img src={companion?.picture} className='searchResultChat__chatPic'/>
                </Link>
                <Link to={`/chats/${chatId}`} className="searchResultChat__chatInfo">
                    <h2>{`${companion?.name} ${companion?.surname}`}</h2>
                    <h3>{lastMessage ? lastMessage: 'start dialog...'}</h3>
                </Link>
            </li>
        )
    }

    if (type === 'groupchat') {
        return (
            <li className={`searchResultChat${isNew ? ' newMessage' : ''}`}>
                <Link to={`/chats/${chatId}`} >
                    <img src={pic} className='searchResultChat__chatPic'/>
                </Link>
                <div className="searchResultChat__chatInfo">
                    <Link to={`/chats/${chatId}`} >
                        <h2>{name}</h2>
                    </Link>
                    <div className="chatInfo__lastMessage">
                    {lastMessage && lastMessageSender?.name ?
                        <>
                            <Link to={`/user/${lastMessageSender?.id}`} >
                                <img
                                    src={lastMessageSender?.picture}
                                    className='lastMessage__userPic'
                                />
                            </Link>
                            <Link to={`/chats/${chatId}`} >
                                <h3>{`${lastMessageSender?.name}: ${lastMessage}`}</h3>
                            </Link>
                        </>
                    :
                        <Link to={`/chats/${chatId}`} >
                            <img
                                className='lastMessage__userPic'
                            />
                            <h3>start dialog...</h3>
                        </Link>
                    }
                    </div>
                </div>
            </li>
        )
    }

    return (
        <div className="error">error</div>
    )
}

export default SearchResultChat