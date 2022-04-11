function useSidebarLinks(path) {
    if (['/sign-in', '/sign-up'].includes(path)) {
        return [
            {
                pathname: '/sign-in',
                icon: 'person-outline',
                name: 'sign in'
            },
            {
                pathname: '/sign-up',
                icon: 'person-add-outline',
                name: 'sign up'
            }
        ]
    }
    else {
        return [
            {
                pathname: '/',
                icon: 'home-outline',
                name: 'home'
            },
            {
                pathname: '/chats',
                icon: 'chatbubble-outline',
                name: 'chats'
            }
        ]
    }
}

export { useSidebarLinks }