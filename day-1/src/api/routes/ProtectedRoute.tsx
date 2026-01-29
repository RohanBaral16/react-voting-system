import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { FourSquare } from "react-loading-indicators";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <FourSquare color="#afaeff" size="medium" text="loading" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
