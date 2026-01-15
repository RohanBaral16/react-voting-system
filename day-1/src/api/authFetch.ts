const BASE_URL = 'http://localhost:5000'

// Login function

export const login = async(voterId: string, password: string)=>{
    const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({voterId, password})
    }) 

    if (!res.ok){
        const error = await res.json()
        throw new Error(error.message || 'Login failed')
    }

    return res.json()
}

export const getProfile = async()=>{
    const res = await fetch(`${BASE_URL}/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if(!res.ok){
        throw new Error('Not logged in')
    }

    return res.json()
}

export const logout = async()=>{
    const res = await fetch(`${BASE_URL}/logout`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if(!res.ok){
        throw new Error('Logout Failed')
    }

    return res.json()
}

