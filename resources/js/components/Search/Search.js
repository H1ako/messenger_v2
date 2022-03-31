// styles
import './Search.scss'
// global dependencies
import { useCallback, useEffect,useState } from 'react'
import { debounce, trim } from 'lodash'
import { useRecoilState } from 'recoil'
// recoil atoms
import { searchResultChatsState, searchResultUsersState } from '../../recoil/SearchAtom'
// libs
import { customFetch } from '../../libs/customFetch'

function Search({ searchType }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [chats, setChats] = useRecoilState(searchResultChatsState)
    const [users, setUsers] = useRecoilState(searchResultUsersState)

    if (!searchType) return (
        <input
            type="text"
            name='search'
            disabled
            className='search'
            placeholder='something went wrong...'
        />
    )

    const getSearchData = useCallback(debounce( (query) => {
        fetch(`/api/search/${searchType}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRF-Token': document.querySelector('meta[name="_token"]').getAttribute('content'),
            },
            body: JSON.stringify({ searchQuery: query })
        })
        .then(request => request.json())
        .then(request => {
            if (request && !request.error) {
                if (searchType === 'chats') {
                    setChats(request)
                }
        
                if (searchType === 'users') {
                    setUsers(request)
                }
            }
        })
    }, 300), [])

    useEffect(() => {
        if (!trim(searchQuery)) return
        
        getSearchData(searchQuery);
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