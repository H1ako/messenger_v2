// components
import Search from '../../Search/Search.js'
import Selector from '../../Selector/Selector.js'
import SearchResults from '../../SearchResults/SearchResults.js'

// for creating new chat
function NewGroupchat() {
    return (
        <div className="page newGroupchatPage">
            <Search />
            <SearchResults type='users' />
        </div>
    )
}

export default NewGroupchat