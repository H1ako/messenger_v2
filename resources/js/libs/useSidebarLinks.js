function useSidebarLinks(path) {
    if (['/login/sign-in', '/login/sign-up'].includes(path)) {
        return [
            {
                pathname: '/login/sign-in',
                icon: 'person-outline',
                name: 'sign in'
            },
            {
                pathname: '/login/sign-up',
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
                icon: 'chatbubbles-outline',
                name: 'chats'
            }
        ]
    }
}

export { useSidebarLinks }