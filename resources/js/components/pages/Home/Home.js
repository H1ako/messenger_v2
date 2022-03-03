// styles
import './Home.scss'
// components
import Search from '../../Search/Search.js'
import Selector from '../../Selector/Selector.js'
import SearchResults from '../../SearchResults/SearchResults.js'

// home page
function Home(props) {
    return (
        <div className="page homePage">
            <Search/>
            <Selector/>
            <SearchResults/>
        </div>
    )
}

export default Home