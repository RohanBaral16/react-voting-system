import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext"

type Props = {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return <p>Loading...</p>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
