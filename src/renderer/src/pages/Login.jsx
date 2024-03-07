import { useEffect, useState } from "react"
import { useAuth } from '../context/authContext'
import { useNavigate } from "react-router-dom";
import logo from '../assets/dbpos.svg';
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();
  const loginSubmit = (e) => {
    e.preventDefault()
    const data = {
      username: username,
      password: password
    }
    login(data);

  }
  // const navigate = useNavigate();
  // const checkLogin = () => {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   if (user || user != null) {
  //     if (user.roles == 'admin') {
  //       navigate('/')
  //     }
  //   }
  // }
  // useEffect(() => {
  //   checkLogin()
  // }, [])
  return (
    <div className="login-wrapper d-flex justify-content-center align-items-center min-vh-100">
      <div className="card login-card">
        <div className="card-body">
          <div className="text-center">
            <h5 className="mb-3">
              Selamat datang di <span className='fw-bold'>DBPOS</span>, silahkan login!!
            </h5>
          </div>
          <form onSubmit={loginSubmit}>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className='btn btn-primary w-100'>
              Masuk
            </button>
            <small className='text-muted'>Jika ada masalah dengan proses masuk, hubungi <a href="#">admin</a></small>
          </form>
          <div className='text-center'>
            <small className=''>www.dbpos.com &copy; 2024</small>
          </div>
        </div>
      </div>
    </div>
  )
}