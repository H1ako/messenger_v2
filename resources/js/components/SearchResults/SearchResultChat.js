function SearchResultChat({
    chatId,
    type,
    pic,
    name,
    lastMessage,
    lastMessageFromName,
    lastMessageFromPic
}) {

    if (type === 'dialog') {
        return (
            <li className='searchResultChat'>
                <img src={pic} className='searchResultChat__chatPic' alt="chat pic"/>
                <span className="searchResultChat__chatInfo">
                    <h2>{name}</h2>
                    <h3>{lastMessage}</h3>
                </span>
            </li>
        )
    }

    if (type === 'groupChat') {
        return (
            <li className='searchResultChat'>
                <img src={pic} className='searchResultChat__chatPic' alt="chat pic"/>
                <span className="searchResultChat__chatInfo">
                    <h2>{name}</h2>
                    <div className="chatInfo__lastMessage">
                        <img
                            src={lastMessageFromPic}
                            className='lastMessage__userPic'
                            alt="user pic"
                        />
                        <h3>{`${lastMessageFromName}: ${lastMessage}`}</h3>
                    </div>
                </span>
            </li>
        )
    }

    return (
        <div className="error">error</div>
    )
}

export default SearchResultChat