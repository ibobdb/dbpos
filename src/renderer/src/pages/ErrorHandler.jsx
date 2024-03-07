import { useAuth } from "../context/authContext"
export default function ErrorHandler() {
  const { checkConnection } = useAuth();
  const refresh = () => {
    checkConnection()
  }
  return (
    <div className="login-wrapper d-flex justify-content-center align-items-center min-vh-100">
      <div className="card login-card">
        <div className="card-body">
          <div className="text-center">
            <h5 className="mb-3">
              Server tidak terhubung :(
            </h5>
            <button className="btn btn-sm btn-primary" onClick={refresh}>Refresh</button>
            <small className="text-danger mt-2 d-block">
              Periksa koneksi server dan databse
            </small>
          </div>
          <div className='text-center pt-2'>
            <small className=''>www.dbpos.com &copy; 2024</small>
          </div>
        </div>
      </div>
    </div>
  )
}