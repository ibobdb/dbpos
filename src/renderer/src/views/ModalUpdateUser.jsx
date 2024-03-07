import { Modal } from 'react-bootstrap'
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import { useGlobalState } from '../context/globalStateContext';
export default function ModalUpdateUser(props) {
  const handleClose = () => {
    props.onClose()
  }
  const { updatePageLoading } = useGlobalState();
  const onSubmit = (e) => {
    e.preventDefault()
  }
  const [username, setUserName] = useState(props.data.username);
  const [fullname, setFullName] = useState(props.data.fullname);
  const [role, setRole] = useState(props.data.role);
  const resetForm = () => {
    setUserName('')
    setFullName('')
    setRole('cashier');
  }
  const roles = [
    { name: 'ADMIN', value: 'admin' },
    { name: 'INVENTORY/GUDANG', value: 'inventory' },
    { name: 'KASIR', value: 'cashier' },
  ]
  return (
    <Modal
      show={props.show}
      onHide={handleClose}
      backdrop="static"
      keyboard={true}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Update user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control form-control-sm" placeholder="ibobdb" value={username} onChange={(e) => setUserName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Nama Lengkap</label>
            <input type="text" className="form-control form-control-sm" placeholder="Boby Nugraha" value={fullname} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select className="form-select form-select-sm" value={role} onChange={(e) => setRole(e.target.value)} required>
              {roles.map((item, key) => {
                return (
                  <option value={item.value} key={key}>{item.name}</option>
                )
              })}
            </select>
          </div>
          <div className="form-group d-flex gap-2 my-3">
            <button className="btn btn-primary btn-sm" type="submit">Simpan</button>
            <button className="btn btn-danger btn-sm" type="reset" onClick={resetForm}>Reset</button>
          </div>
        </form>
      </Modal.Body>
    </Modal >
  )
}