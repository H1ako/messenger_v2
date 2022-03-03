// styles
import './Search.scss'
// global dependencies
import { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'

function Search({}) {

    const [searchQuery, setSearchQuery] = useState('')

    // debounced
    const getSearchData = useCallback(debounce(query => {

    }, 500), [])

    useEffect(() => {
        const searchData = getSearchData(searchQuery)

    }, [searchQuery])

    return (
        <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            name='search' 
            className='search'
            placeholder='search'
        />
    )
}

export default Search