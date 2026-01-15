import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { login as apiLogin, logout as apiLogout, getProfile as apiGetProfile } from '../api/authFetch'

type UserType = { voterId: string; name: string } | null;

type ErrorType = string | null

type AuthContextType = {
  user: UserType;
  error: ErrorType;
  login: (voterId: string, password: string)=> Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
    user: null,
    error: null,
    login: async (_voterId: string, _password: string) => {
        // default empty implementation
        return Promise.resolve();
    },
    logout: async () => {
        return Promise.resolve();
    }
});

//provider
export  const AuthProvider = ({children}: {children: ReactNode})=>{

    const [user, setUser] = useState<UserType>(null)
    const [error, setError] = useState<ErrorType>(null)
    const [loading, setLoading] = useState(true);

    //login logic

    const login = async (voterId: string, password: string)=>{
        try{
            const profile = await apiLogin(voterId, password)
            console.log('login successful', profile)
            setUser(profile)
            setError(null)
        }catch(err: any){
            setUser(null)
            setError(err.message || 'Failed to Login')
            throw err
        }
        
    }

    //refresh logic

    useEffect(()=>{
        const getProfile = async()=>{
            try{
                const profile = await apiGetProfile()
                setUser(profile)
                setError(null)
            }catch(err: any){
                setUser(null)
                setError(err.message || 'Failed to fetch User')
            }finally {
                setLoading(false);
            }
        }
        //calling getProfile function here
        getProfile()
    }, [])

    //logout logic
    const logout = async()=>{
        try{
            await apiLogout()
            setUser(null)
            setError(null)
        }catch(err: any){
            setError(err.message || 'Failed to Logout')
            throw err
        }
    }


    return(
        <AuthContext.Provider value={{user, login, logout, error}}>
            {!loading ? children : <div>Loading...</div>}
        </AuthContext.Provider>
    )

}