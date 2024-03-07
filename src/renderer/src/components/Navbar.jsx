import { useAuth } from '../context/authContext';
import dbpos from '../assets/dbpos.svg';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import ModalPrinterSetting from '../views/ModalPrinterSetting';
import { Link } from 'react-router-dom';
export default function Navbar() {
  const [user, setUser] = useState('');
  const getUser = () => {
    const token = sessionStorage.getItem('token');
    if (token != null) {
      const decode = jwtDecode(token)
      setUser(decode)

    }
  }
  useEffect(() => {
    getUser()
  }, [])
  const [modalPrinter, setModalPrinter] = useState(false);
  const handlePrinterOnclick = () => {
    setModalPrinter(true)
  }
  const handleCloseModal = () => {
    setModalPrinter(false)
  }
  const { logout } = useAuth();
  const handleLogout = () => {
    // logout()
    Swal.fire({
      icon: 'question',
      title: 'Apakah anda yakin ingin keluar?',
      showCancelButton: true,
      confirmButtonText: "Keluar",
    }).then(response => {
      if (response.isConfirmed) {
        logout()
      }
    })
  }
  const [dropshow, setDropShow] = useState(false);
  const handleUserSetOnClick = () => {
    if (dropshow) {
      setDropShow(false)
    } else {
      setDropShow(true)
    }
  }
  return (
    <header className="navbar sticky-top flex-md-nowrap p-0 shadow bg-light">
      <Link to={'/'} className="navbar-brand col-md-3 col-lg-2 me-0 px-3 bg-light">
        <img src={dbpos} alt="logo" width={75} height={35} />
      </Link>
      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="navbar-nav">
        <div className="nav-item text-nowrap d-flex">
          <div className='dropdown'>
            <button type='button' className='nav-link px-3 dropdown-toggle' onClick={handleUserSetOnClick}>
              <small className='text-capitalize'>  {user ? user.userFullname : 'tidaklogin'}</small>
            </button>
            <ul className={`dropdown-menu shadow ${dropshow ? 'show' : ''}`}>
              <li className='dropdown-item' onClick={handlePrinterOnclick}>Printer Setting <span className='bx bx-printer'></span></li>
              <li className='dropdown-item text-danger' onClick={handleLogout}>Logout <i className="bx bx-power-off"></i></li>
            </ul>
          </div>
        </div>
      </div>
      <ModalPrinterSetting
        show={modalPrinter}
        onClose={handleCloseModal}
      />
    </header>
  );
}
