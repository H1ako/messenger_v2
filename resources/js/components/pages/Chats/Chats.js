// components
import Search from '../../Search/Search.js'
import Selector from '../../Selector/Selector.js'
import SearchResults from '../../SearchResults/SearchResults.js'

// chats page
function Chats(props) {
    return (
        <div className="page chatsPage">
            <Search/>
            <div className="pageRow">
                <Selector type='chats'/>
                <a href='/new-groupchat'>new groupchat</a>
            </div>
            <SearchResults type='chats'/>
        </div>
    )
}

export default Chats