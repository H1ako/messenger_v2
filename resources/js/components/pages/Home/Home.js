// global dependencies
import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
// recoil atoms
import { userTypeState } from '../../../recoil/SelectorAtom.js'
import { searchResultUsersState } from '../../../recoil/SearchAtom.js'
// components
import Search from '../../Search/Search.js'
import Selector from '../../Selector/Selector.js'
import SearchResults from '../../SearchResults/SearchResults.js'
// libs
import { customFetch } from '../../../libs/customFetch.js'

// home page
function Home() {
    const userType = useRecoilValue(userTypeState)
    const [users, setUsers] = useRecoilState(searchResultUsersState)

    useEffect(() => {
        customFetch(`/api/friends/${userType}`, 'POST')
        .then(data => data.json())
        .then(data => {
            if (data) {
                setUsers(data)
            }
        })
    }, [userType])

    return (
        <div className="page homePage">
            <Search searchType='users'/>
            <div className="pageRow">
                <Selector type='users'/>
            </div>
            <SearchResults searchResults={users} type='users'/>
        </div>
    )
}

export default Home