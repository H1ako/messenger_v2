import { atom } from 'recoil'
import english from '../../localization/en.js'

export const currentLanguageAtom = atom({
    key: 'currentLanguageAtom',
    default: english
})