// styles
import './NewGroupchat.scss'
// components
import Search from '../../Search/Search.js'
import SearchResults from '../../SearchResults/SearchResults.js'
import UploadPicture from '../../UploadPicture/UploadPicture.js'

// for creating new chat
function NewGroupchat() {
    return (
        <div className="page newGroupchatPage">
            <div className="mainInfo">
                <UploadPicture />
                <input type="text" placeholder='chat name' />
            </div>
            <Search />
            <SearchResults type='users' />
            <button>ok</button>
        </div>
    )
}

export default NewGroupchat