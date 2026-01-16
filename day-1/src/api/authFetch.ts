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

    if (!res.ok) {
    let errorMessage = 'Login failed';
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      // Fallback if the server didn't return JSON
      if (res.status === 401) errorMessage = 'Invalid Voter ID or Password';
    }
    throw new Error(errorMessage);
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

