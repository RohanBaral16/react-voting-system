import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./features/auth/Login";
import ForgotPassword from "./features/auth/ForgotPassword";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./features/voting/dashboard";
import Navbar from "./layout/Navbar";
import Booth from "./features/voting/Booth";
import Register from "./features/auth/Register";
import PublicRoute from "./api/routes/PublicRoute";
import {
  BallotInfo,
  ElectionInfo,
  DemoBooth,
  CandidatesInfo,
} from "./features/publicInfo";

import ProtectedRoute from "./api/routes/ProtectedRoute";
function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/forgotpassword"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route path="/demovote" element={<DemoBooth />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vote/"
            element={
              <ProtectedRoute>
                <Booth />
              </ProtectedRoute>
            }
          />

          <Route path="/candidates-info" element={<CandidatesInfo />} />
          <Route path="/election-info" element={<ElectionInfo />} />
          <Route path="/demo-booth-fptp" element={<DemoBooth />} />
          <Route path="/demo-booth-pr" element={<DemoBooth />} />
          <Route path="/ballot-info" element={<BallotInfo />} />
          <Route path="/ballot-info" element={<BallotInfo />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
