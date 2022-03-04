function SearchResultUser({
    userId,
    username,
    pic,
    relationship,
    requestFrom
}) {

    if (relationship === 'friend') {
        return (
            <li className='searchResultUser'>
                <span className='userInfo'>
                    <img src={pic} alt="user pic"/>
                    <h2>{username}</h2>
                </span>
                <span className="btns">
                    <button className='accentColor'>remove</button>
                </span>
            </li>
        )
    }

    if (relationship === '') {
        return (
            <li className='searchResultUser'>
                <span className='userInfo'>
                    <img src={pic} alt="user pic"/>
                    <h2>{username}</h2>
                </span>
                <span className="btns">
                    <button className='mainColor'>add</button>
                </span>
            </li>
        )
    }

    if (relationship === 'request' && requestFrom !== userId) {
        return (
            <li className='searchResultUser'>
                <span className='userInfo'>
                    <img src={pic} alt="user pic"/>
                    <h2>{username}</h2>
                </span>
                <span className="btns">
                    <button className='mainColor'>accept</button>
                    <button className='accentColor'>cancel</button>
                </span>
            </li>
        )
    }

    if (relationship === 'request' && requestFrom === userId) {
        return (
            <li className='searchResultUser'>
                <span className='userInfo'>
                    <img src={pic} alt="user pic"/>
                    <h2>{username}</h2>
                </span>
                <span className="btns">
                    <button className='accentColor'>cancel</button>
                </span>
            </li>
        )
    }

    return (
        <div className="error">error</div>
    )
}

export default SearchResultUser