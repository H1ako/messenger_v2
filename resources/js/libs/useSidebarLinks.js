// localization
import russian from '../../localization/ru.js'
import english from '../../localization/en.js'

function useSidebarLinks(path, lang) {
    if (['/sign-in', '/sign-up'].includes(path)) {
        return [
            {
                pathname: '/sign-in',
                icon: 'person-outline',
                name: lang === 'en' ? english.keys?.signIn : russian.keys?.signIn
            },
            {
                pathname: '/sign-up',
                icon: 'person-add-outline',
                name: lang === 'en' ? english.keys?.signUp : russian.keys?.signUp
            }
        ]
    }
    else {
        return [
            {
                pathname: '/',
                icon: 'home-outline',
                name: lang === 'en' ? english.keys?.home : russian.keys?.home
            },
            {
                pathname: '/chats',
                icon: 'chatbubble-outline',
                name: lang === 'en' ? english.keys?.chats : russian.keys?.chats
            }
        ]
    }
}

export { useSidebarLinks }