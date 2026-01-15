import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom'
import Login from './features/auth/Login'
import ForgotPassword from './features/auth/ForgotPassword'
import Register from './features/auth/Register'
import MainLayout from './layout/MainLayout'
import Dashboard from './features/voting/dashboard'
function App() {

  return (
    <>

      <Routes>
        <Route element={<MainLayout/>}>
          <Route index element={<Navigate to='/login' replace/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='dashboard' element={<Dashboard/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
