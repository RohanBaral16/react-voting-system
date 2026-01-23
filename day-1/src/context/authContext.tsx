import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { login as apiLogin, logout as apiLogout, getProfile as apiGetProfile, getProfile } from '../api/authFetch'
import { FourSquare } from 'react-loading-indicators'
import  { type Dispatch, type SetStateAction } from 'react';
// todo: when backend is ready, define Usertype here
type UserType = { username: string,  province: {id:number, name:string}, district:{id: number, name: string}, electoral_area:{id:number, name:string}} | null;

type ErrorType = string | null

type AuthContextType = {
  user: UserType;
  error: ErrorType;
  loading: boolean|null;
  login: (voterId: string, password: string)=> Promise<void>;
  logout: () => Promise<void>;
  setLoading: Dispatch<SetStateAction<boolean>>
};

export const AuthContext = createContext<AuthContextType>({
    user: null,
    error: null,
    loading: null,
    login: async (_voterId: string, _password: string) => {
        // default empty implementation
        return Promise.resolve();
    },
    logout: async () => {
        return Promise.resolve();
    },
    setLoading: () => {},
});

//provider
export  const AuthProvider = ({children}: {children: ReactNode})=>{

    const [user, setUser] = useState<UserType>(null)
    const [error, setError] = useState<ErrorType>(null)
    const [loading, setLoading] = useState(true);

    //login logic

    const login = async (email: string, password: string)=>{
    try{
        setLoading(true)
        await apiLogin(email, password)
        const profile = await getProfile()
        setUser(profile)
        setError(null)
    }catch(err: any){
        setError(err.message || 'Login failed')
        throw err
    }finally{
        setLoading(false)
    }
}

    //refresh logic

    useEffect(()=>{
        const getProfile = async()=>{
            try{
                setLoading(true)
                const profile = await apiGetProfile()
                setUser(profile)
                setError(null)
            }catch(err: any){
                setUser(null)
            }finally {
                setLoading(false);
                console.log("No active session found.")
            }
        }
        //calling getProfile function here
        getProfile()
    }, [])

    //logout logic
    const logout = async()=>{
        try{
            setLoading(true)
            await apiLogout()
            setUser(null)
            setError(null)

        }catch(err: any){
            setError(err.message || 'Failed to Logout')
            throw err
        }finally{
            setLoading(false)
        }
    }


    return(
        <AuthContext.Provider value={{ user, login, logout, error, loading, setLoading }}>
        <div className="relative">
        {children}
        {loading && (
            /* Changed 'absolute' to 'fixed' and ensured 'inset-0' is used */
            <div className="fixed inset-0 flex items-center justify-center z-50">
            <FourSquare color="#afaeff" size="medium" text="loading" />
            </div>
        )}
        </div>
</AuthContext.Provider>
    )

}