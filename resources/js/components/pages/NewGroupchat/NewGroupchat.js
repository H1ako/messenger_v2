// styles
import './NewGroupchat.scss'
// global dependencies
import { useRecoilValue } from 'recoil'
// recoil atoms
import { searchResultUsersState } from '../../../recoil/SearchAtom'
// components
import Search from '../../Search/Search.js'
import SearchResults from '../../SearchResults/SearchResults.js'
import UploadPicture from '../../UploadPicture/UploadPicture.js'


// for creating new chat
function NewGroupchat() {
    const users = useRecoilValue(searchResultUsersState)
    
    return (
        <div className="page newGroupchatPage">
            <div className="mainInfo">
                <UploadPicture />
                <input type="text" placeholder='chat name' />
            </div>
            <Search searchType='users'/>
            <SearchResults searchResults={users} type='chatMembers' />
            <button>ok</button>
        </div>
    )
}

export default NewGroupchat