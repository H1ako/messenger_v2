// styles
import './SearchResults.scss'

// home page
function SearchResults(props) {
    return (
        <div className="searchResults">
            <ul>
                <li>
                    <span className='userInfo'>
                        <img src='/assets/ava.png' alt="user pic"/>
                        <h2>Nikita Sobolev</h2>
                    </span>
                    <span className="btns">
                        <button className='mainColor'>add</button>
                    </span>
                </li>
                <li>
                    <span className='userInfo'>
                        <img src='/assets/ava.png' alt="user pic"/>
                        <h2>Nikita Sobolev</h2>
                    </span>
                    <span className="btns">
                        <button className='accentColor'>remove</button>
                    </span>
                </li>
                <li>
                    <span className='userInfo'>
                        <img src='/assets/ava.png' alt="user pic"/>
                        <h2>Nikita Sobolev</h2>
                    </span>
                    <span className="btns">
                        <button className='mainColor'>add</button>
                        <button className='accentColor'>remove</button>
                    </span>
                </li>
                <li>
                    <span className='userInfo'>
                        <img src='/assets/ava.png' alt="user pic"/>
                        <h2>Nikita Sobolev</h2>
                    </span>
                    <span className="btns">
                        <button className='accentColor'>cancel</button>
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default SearchResults