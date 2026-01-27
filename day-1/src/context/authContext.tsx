import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import {
  login as apiLogin,
  logout as apiLogout,
  getProfile as apiGetProfile,
  getProfile,
} from "../api/authFetch";
import { FourSquare } from "react-loading-indicators";
import { type Dispatch, type SetStateAction } from "react";
// todo: when backend is ready, define Usertype here
type UserType = {
  username: string;
  email: string;
  province: string;
  district: string;
  electoral_area: string;
  has_voted: {
    FPTP: boolean;
    PR: boolean;
  };
} | null;

type ErrorType = string | null;

type AuthContextType = {
  user: UserType;
  error: ErrorType;
  loading: boolean | null;
  login: (voterId: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setLoading: Dispatch<SetStateAction<boolean>>;
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
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>(null);
  const [error, setError] = useState<ErrorType>(null);
  const [loading, setLoading] = useState(true);

  // at top of src/context/authContext.tsx
  let profileRequested = false;

  useEffect(() => {
    if (profileRequested) return;
    profileRequested = true;
    // fetch profile...
  }, []);

  //login logic

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      await apiLogin(email, password);
      const profile = await getProfile();
      setUser(profile);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  //refresh logic

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        const profile = await apiGetProfile();
        console.log("user profile fetched", profile);
        setUser(profile);
        setError(null);
      } catch (err: any) {
        setUser(null);
      } finally {
        setLoading(false);
        console.log("No active session found.");
      }
    };
    //calling getProfile function here
    getProfile();
  }, []);

  //logout logic
  const logout = async () => {
    try {
      setLoading(true);
      await apiLogout();
      setUser(null);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to Logout");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, error, loading, setLoading }}
    >
      <div className="relative">
        {children}
        {loading && (
          /* Changed 'absolute' to 'fixed' and ensured 'inset-0' is used */
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <FourSquare color={"#FFFFEE"} size="medium" text="loading" />
          </div>
        )}
      </div>
    </AuthContext.Provider>
  );
};
