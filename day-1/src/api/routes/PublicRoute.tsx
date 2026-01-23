// PublicRoute.tsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { FourSquare } from "react-loading-indicators";

type Props = {
  children: React.ReactNode;
};

export default function PublicRoute({ children }: Props) {
  const { user, loading } = useContext(AuthContext);

  // Still need to wait for the profile check to finish
  if (loading) {
    return(
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <FourSquare color="#afaeff" size="medium" text="loading" />
            </div>
    )
  }

  // If the user is already logged in, send them to the dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise, allow them to see the login/register page
  return <>{children}</>;
}