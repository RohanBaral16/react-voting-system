import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom'
import Login from './features/auth/Login'
import ForgotPassword from './features/auth/ForgotPassword'
import Register from './features/auth/Register'
import MainLayout from './layout/MainLayout'
function App() {

  return (
    <>

      <Routes>
        <Route element={<MainLayout/>}>
          <Route index element={<Navigate to='/login' replace/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
          <Route path='/register' element={<Register/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
