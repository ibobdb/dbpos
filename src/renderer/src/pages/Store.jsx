import Tabs from "../components/Tabs";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import Axios from 'axios'
import Loading from "../components/Loading";
export default function Store() {
  const button = [
    {
      buttonText: 'Toko',
      target: '#nav-store',
      key: 'store'
    },
    {
      buttonText: 'Edit Toko',
      target: '#nav-update-store',
      key: 'update-store'
    }
  ];
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState('');
  const [address, setAddess] = useState('');
  const [phone, setPhone] = useState('');
  const getStore = async () => {
    try {
      setLoading(true)
      await Axios.get(`${import.meta.env.RENDERER_VITE_BASE_URL}/store`).then(response => {
        setStore(response.data.results.store_name);
        setAddess(response.data.results.store_address);
        setPhone(response.data.results.store_phone);
        setData(response.data.results);
        return
      })
      setLoading(false)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    document.title = "Pengaturan Toko"
    getStore();
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Apakah Data Akan Disimpan?",
        showCancelButton: true,
        confirmButtonText: "Simpan",
        icon: "question"
      }).then(async (result) => {
        if (result.isConfirmed) {
          await Axios.put(`${import.meta.env.RENDERER_VITE_BASE_URL}/store`, {
            store_name: store,
            store_address: address,
            store_phone: phone
          }).then(response => {
            toast.success('Data berhasil disimpan', {
              position: "top-right",
              autoClose: 2000,
              progress: undefined,
              theme: "light",
            });
            getStore();
          })
        }
      });
    } catch (error) {

    }
  }
  return (
    <div>
      <Loading show={loading} />
      <div className="page-header w-100 bg-white p-2 mt-3">
        <h4>Data Toko</h4>
      </div>
      <Tabs button={button}>
        <div className="tab-pane fade show active" id="nav-store" role="tabpanel" aria-labelledby="nav-home-tab">
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex justify-content-between">
                <span className="fs-lg text-muted">Nama Toko</span>
                <span className="fs-lg fw-bold">{data.store_name}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fs-lg text-muted">Alamat:</span>
                <span className="fs-lg">{data.store_address}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fs-lg text-muted">Nomor Telephone</span>
                <span className="fs-lg">{data.store_phone}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="alert alert-secondary">
                <p className="text-muted">Data toko akan di cetak pada printer kasir</p>
              </div>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="nav-update-store" role="tabpanel" aria-labelledby="nav-profile-tab">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nama toko</label>
              <input type="text" className="form-control form-control-sm" value={store} onChange={(e) => setStore(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Alamat</label>
              <input type="text" className="form-control form-control-sm" value={address} onChange={(e) => setAddess(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Telepon</label>
              <input type="text" className="form-control form-control-sm" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="form-group">
              <button className="btn btn-sm btn-primary" type="submit">Simpan</button>
            </div>
          </form>
        </div>
      </Tabs>
    </div>
  );
}
