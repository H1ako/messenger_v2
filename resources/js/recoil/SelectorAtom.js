import { atom } from 'recoil'

export const chatTypeState = atom({
    key: 'chatTypeState',
    default: 'all'
})

export const userTypeState = atom({
    key: 'userTypeState',
    default: 'all'
})