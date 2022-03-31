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

    const debouncedSearch = query => {
        // const data = customFetch(`/api/search/${searchType}`, "POST", JSON.stringify({ searchQuery }))
        // console.log(data)
        // return data
        let data = "[]"
        fetch(`/api/search/${searchType}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRF-Token': document.querySelector('meta[name="_token"]').getAttribute('content'),
            },
            body: JSON.stringify({ searchQuery })
        })
        .then(request => request.json())
        .then(request => {
            console.log(request)
            data = request
        })

        return data
        // customFetch(`/api/search/${searchType}`, "POST", JSON.stringify({ searchQuery }))
        // .then(data => data.json())
        // .then(data => {
        //     console.log(data)
        // })
    }
    const getSearchData = useCallback(debounce( query => debouncedSearch(query), 500), [])

    useEffect(() => {
        if (!trim(searchQuery)) return
        
        const d = getSearchData(searchQuery);
        console.log(d)
        // .then(data => data.json)
        // .then(data => {
        //     // console.log(data)
        // })
        

        // if (searchType === 'chats') {
        //     setChats(searchData)
        // }

        // if (searchType === 'users') {
        //     setUsers(searchData)
        // }
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