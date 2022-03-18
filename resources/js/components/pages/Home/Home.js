// components
import Search from '../../Search/Search.js'
import Selector from '../../Selector/Selector.js'
import SearchResults from '../../SearchResults/SearchResults.js'

// home page
function Home() {
    return (
        <div className="page homePage">
            <Search/>
            <div className="pageRow">
                <Selector type='users'/>
            </div>
            <SearchResults type='users'/>
        </div>
    )
}

export default Home