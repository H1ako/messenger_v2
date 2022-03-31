import { atom } from 'recoil'

export const searchResultChatsState = atom({
    key: 'searchResultChatsState',
    default: []
})

export const searchResultUsersState = atom({
    key: 'searchResultUsersState',
    default: []
})