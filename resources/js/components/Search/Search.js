// styles
import './Search.scss'
// global dependencies
import { useCallback, useEffect,useState } from 'react'
import { debounce, trim } from 'lodash'
import { useRecoilState } from 'recoil'
// recoil atoms
import { searchResultChatMembersState, searchResultChatsState, searchResultUsersState } from '../../recoil/SearchAtom'
// libs
import { customFetch } from '../../libs/customFetch'

function Search({ searchType }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [chats, setChats] = useRecoilState(searchResultChatsState)
    const [users, setUsers] = useRecoilState(searchResultUsersState)
    const [chatMembers, setChatMembers] = useRecoilState(searchResultChatMembersState)

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
        customFetch(`/api/search/${searchType}`, "POST", JSON.stringify({ searchQuery: query }))
        .then(request => request.json())
        .then(request => {
            if (request && !request.error) {
                if (searchType === 'chats') {
                    setChats(request)
                }
        
                if (searchType === 'users') {
                    setUsers(request)
                }

                if (searchType === 'friends') {
                    setChatMembers(request)
                }
            }
        })
    }, 200), [])

    useEffect(() => {
        if (searchType === 'users' && !trim(searchQuery)) return
        
        getSearchData(searchQuery)
    }, [searchQuery])

    return (
        <input
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            name='search' 
            className='search'
            placeholder='search'
        />
    )
}

export default Search