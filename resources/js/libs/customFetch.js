async function customFetch (url, method, data={}, headers={}) {
    return await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRF-Token': document.querySelector('meta[name="_token"]').getAttribute('content'),
            ...headers
        },
        body: data
    })
}

export { customFetch }