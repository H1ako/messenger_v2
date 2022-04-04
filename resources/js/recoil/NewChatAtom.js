import { atom } from 'recoil'

export const newChatMembersIdsState = atom({
    key: 'newChatMembersIdsState',
    default: []
})

export const newChatPictureFileState = atom({
    key: 'newChatPictureFileState',
    default: ''
})