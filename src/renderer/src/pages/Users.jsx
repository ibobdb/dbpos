import Tabs from "../components/Tabs";
import NewTable from "../components/NewTable";
import { useState, useEffect } from "react";
import ModalUpdateUser from "../views/ModalUpdateUser";
import userAPI from '../api/userAPI'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import { useGlobalState } from '../context/globalStateContext';
export default function User() {
  const { updatePageLoading } = useGlobalState();
  const [dataTable, setDataTable] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState('');

  const button = [
    {
      buttonText: 'Tabel Pengguna',
      target: '#nav-users',
      key: 'users'
    },
    {
      buttonText: 'Tambah Pengguna',
      target: '#nav-add-users',
      key: 'add-users'
    },
  ]
  const columns = [
    {
      name: 'Username',
      selector: row => row.username,
    },
    {
      name: 'Fullname',
      selector: row => row.fullname
    },
    {
      name: 'Roles',
      selector: row => row.roles
    },
    {
      name: 'Perintah',
      cell: (row) => <div div className='d-flex gap-2'>
        {row.roles == 'master' ? '' : <button className="btn btn-danger btn-sm" type="button" onClick={() => onDelete(row.id)}><i className="bx bx-trash"></i></button>}
        <button className="btn btn-primary btn-sm" type="button" onClick={() => onUpdate(row.id)}><i className="bx bx-pencil"></i></button>
      </div>
      ,
      allowoverflow: true,
    },
  ];

  const roles = [
    { name: 'ADMIN', value: 'admin' },
    { name: 'INVENTORY/GUDANG', value: 'inventory' },
    { name: 'KASIR', value: 'cashier' },
  ]
  const onDelete = (id) => {
    Swal.fire({
      title: "Apakah data akan di hapus?",
      showCancelButton: true,
      confirmButtonText: "Save",
      icon: "question"
    }).then(async (result) => {
      if (result.isConfirmed) {
        updatePageLoading(true)
        await userAPI.deleteUser(id)
          .then(() => {
            toast.success('Data berhasil di hapus', {
              position: "top-right",
              autoClose: 2000,
              progress: undefined,
              theme: "light",
            });
            getUserList()
          })
        updatePageLoading(false)
      }
    });
  }
  const onUpdate = async (id) => {
    try {
      await userAPI.getUserById(id).then(response => {
        const data = response.results;
        setDataDetail({
          username: data.username,
          fullname: data.fullname,
          role: data.roles
        });
        setModal(true);
      })
    } catch (error) {
      throw error
    }
  }
  const handleSearch = (value) => {
    setKeyword(value)
  }
  const [modal, setModal] = useState(false);
  const [dataDetail, setDataDetail] = useState([]);
  const handleCloseModal = () => {
    setModal(false)
  }
  const handleOpenModal = (id) => {
    const detail = dataTable.data.find(item => {
      return item.id == id
    });
    setDataDetail(detail);
    setModal(true);
  }
  const getUserList = async () => {
    try {
      await userAPI.getUser(page, limit, keyword).then(response => {
        setDataTable(response.results);
      })
    } catch (error) {
      throw error
    }
  }
  const [username, setUserName] = useState();
  const [fullname, setFullName] = useState();
  const [role, setRole] = useState('cashier');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setUserName('');
    setFullName('');
    setRole('cashier');
    setPassword('');
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      fullname: fullname,
      roles: role,
      password: password
    }
    try {
      await userAPI.createUser(data).then(response => {
        toast.success('Data berhasil disimpan', {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
        })
        getUserList()
        resetForm()
      })
    } catch (error) {
      throw error
    }
  }
  useEffect(() => {
    getUserList();
  }, [keyword, page])
  useEffect(() => {
    getUserList();
    document.title = 'Daftar Pengguna'
  }, [])
  return (
    <div>
      <div className="page-header w-100 bg-white p-2 mt-3">
        <h4>Pengguna</h4>
      </div>
      <Tabs button={button}>
        <div className="tab-pane fade show active" id="nav-users" role="tabpanel">
          <NewTable
            data={dataTable.data}
            rows={dataTable.totalItems}
            columns={columns}
            limit={limit}
            onChangePage={page => setPage(page)}
            onSearch={handleSearch}
            isExport={false}
          />
        </div>
        <div className="tab-pane fade" id="nav-add-users" role="tabpanel">
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
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control form-control-sm" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <small className="text-muted"> *Username dan password akan digunakan untuk login</small>
            <div className="form-group d-flex gap-2 my-3">
              <button className="btn btn-primary btn-sm" type="submit">Simpan</button>
              <button className="btn btn-danger btn-sm" type="reset" onClick={resetForm}>Reset</button>
            </div>
          </form>
        </div>
        <ModalUpdateUser
          show={modal}
          onClose={handleCloseModal}
          data={dataDetail}
        />
      </Tabs>
    </div>
  )
}