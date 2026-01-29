import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./features/auth/Login";
import ForgotPassword from "./features/auth/ForgotPassword";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./features/voting/dashboard";
import Booth from "./features/voting/Booth";
import Register from "./features/auth/Register";
import PublicRoute from "./api/routes/PublicRoute";
import FAQ from "./features/publicInfo/FAQ";
import Contact from "./features/publicInfo/Contact";
import BallotInfo from "./features/voting/BallotInfo";
import {
  ElectionInfo,
  DemoBooth,
  CandidatesInfo,
  ElectionResults,
} from "./features/publicInfo";
import PartyResultCard from "./components/ui/PartyResultCard";
import CandidateResultCard from "./components/ui/CandidateResultCard";

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
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />

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
          <Route
            path="/ballot-info/"
            element={
              <ProtectedRoute>
                <BallotInfo />
              </ProtectedRoute>
            }
          />

          <Route path="/candidates-info" element={<CandidatesInfo />} />
          <Route path="/election-info" element={<ElectionInfo />} />
          <Route path="/results" element={<ElectionResults />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
