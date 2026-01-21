import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom'
import Login from './features/auth/Login'
import ForgotPassword from './features/auth/ForgotPassword'
import Register from './features/auth/Register'
import MainLayout from './layout/MainLayout'
import Dashboard from './features/voting/Dashboard'
import Booth from './features/voting/Booth'

// delete this later
import RegisterPrototype from './features/auth/RegistrationPrototype'

import { BallotInfo, ElectionInfo, DemoBooth, CandidatesInfo, ElectionResults } from './features/publicInfo';

import ProtectedRoute from './api/routes/ProtectedRoute'
function App() {

  return (
    <>

      <Routes>
        <Route element={<MainLayout/>}>
          <Route index element={<Navigate to='/login' replace/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
          <Route path='/register' element={<RegisterPrototype/>}/>

          <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path="/dashboard/vote" element={<ProtectedRoute><Booth /></ProtectedRoute>} />
          <Route path="/dashboard/voter-info" element={<Booth/>} />

          <Route path='/candidates-info' element={<CandidatesInfo/>}/>
          <Route path='/election-info' element={<ElectionInfo/>}/>
          <Route path='/demo-booth' element={<DemoBooth/>}/>
          <Route path='/ballot-info' element={<BallotInfo/>}/>
          <Route path='/ballot-info' element={<BallotInfo/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
