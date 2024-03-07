import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
// import BottomAlert from './components/BottomAlert'
// import DatabaseSettings from "./pages/database-settings";
import Cashier from './pages/Cashier';
import DashboardLayout from "./pages/DashboardLayout";
import Login from './pages/Login';
import Error from './pages/ErrorHandler'
import { AuthProvider } from './context/authContext';
import PageLoading from "./components/PageLoading";
import { useGlobalState } from "./context/globalStateContext";
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/src/sweetalert2.scss'
import 'boxicons'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
function App() {
  const navigate = useNavigate()
  const isLogged = () => {
    const token = sessionStorage.getItem('token');
    if (token == null || token == undefined) {
      navigate('/login')
    }
  }
  useEffect(() => {
    isLogged()
  }, [])
  const { pageLoading } = useGlobalState()
  useEffect(() => {
    document.body.style.overflow = pageLoading ? 'hidden' : 'auto';
  }, [pageLoading])
  return (
    <div className="App">
      <AuthProvider>
        <ToastContainer />
        <PageLoading show={pageLoading} />
        <Routes>
          <Route exact path="/login" Component={Login} />
          <Route exact path="*" Component={DashboardLayout} />
          <Route exact path="/cashier" Component={Cashier} />
          <Route exact path="/error" Component={Error} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
