import { Link } from "react-router-dom"

function SearchResultChat({
    chatId,
    type,
    pic,
    name,
    lastMessage,
    companion,
    lastMessageSender
}) {

    if (type === 'dialog') {
        return (
            <li>
                <Link className="searchResultChat" to={`/chats/${chatId}`}>
                    <img src={companion.picture} className='searchResultChat__chatPic'/>
                    <span className="searchResultChat__chatInfo">
                        <h2>{`${companion.name} ${companion.surname}`}</h2>
                        <h3>{lastMessage ? lastMessage: 'start dialog...'}</h3>
                    </span>
                </Link>
            </li>
        )
    }

    if (type === 'groupchat') {
        return (
            <li>
                <Link className="searchResultChat" to={`/chats/${chatId}`}>
                    <img src={pic} className='searchResultChat__chatPic'/>
                    <span className="searchResultChat__chatInfo">
                        <h2>{name}</h2>
                        <div className="chatInfo__lastMessage">
                        {lastMessage && lastMessageSender?.name ?
                            <>
                                <img
                                    src={lastMessageSender?.picture}
                                    className='lastMessage__userPic'
                                />
                                <h3>{`${lastMessageSender?.name}: ${lastMessage}`}</h3>
                            </>
                        :
                            <>
                                <img
                                    className='lastMessage__userPic'
                                />
                                <h3>start dialog...</h3>
                            </>
                        }
                        </div>
                    </span>
                </Link>
            </li>
        )
    }

    return (
        <div className="error">error</div>
    )
}

export default SearchResultChat