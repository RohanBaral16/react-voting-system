import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/authContext"
import { useNavigate } from "react-router-dom"
import Button from "../../components/ui/button"

export default function Dashboard(){
    const{user, loading, logout} = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(()=>{
        if(loading){
            return
        }
        if(!user){
            navigate('/login')
        }
    }, [user, navigate, loading])

    async function userLogOut(){
        try{
            await logout()
        }catch(err: any){
            console.log('Logout error: ', err)
        }
    }

    return(
        <>
            <p className="text-gray-900">{`Username: ${user?.name}, Voter-id: ${user?.voterId}`}</p>
            <Button onClick={async()=>{userLogOut()}} variant="secondary">Logout</Button>
        </>
    ) 
}