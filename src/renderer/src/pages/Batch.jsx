import Tabs from "../components/Tabs";
import NewTable from "../components/NewTable";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import batchstockAPI from "../api/batchstockAPI";
import SearchProduct from "../views/SearchProduct";
import { useAuth } from '../context/authContext'
import { dateFormat } from "../common/numberFormat";
import Loading from "../components/Loading";

export default function Batch() {
  const [dataTable, setDataTable] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [keyword, setKeyword] = useState('');
  const { getUser } = useAuth();
  const [progress, setProgress] = useState(false);
  const button = [
    {
      buttonText: 'Batch & Stok',
      target: '#nav-batch',
      key: 'batch'
    },
    {
      buttonText: 'Buat Batch',
      target: '#nav-add-batch',
      key: 'add-batch'
    }
  ]
  const columns = [
    {
      name: 'Batch',
      selector: row => <span className="fw-bold">{row.batch_code}</span>,
      sortable: true,
      grow: 1000
    },
    {
      name: 'Barcode',
      selector: row => <span className="fw-bold">{row.product_barcode}</span>,
      sortable: true,
      grow: 2000
    },
    {
      name: 'Nama Produk',
      selector: row => <span className="text-uppercase">{row.product && row.product.product_name}</span>,
      grow: 3000,
      wrap: true
    },
    {
      name: 'Stok',
      selector: row => row.stock,
      sortable: true
    },
    {
      name: 'Tanggal Expire',
      selector: row => dateFormat(row.expire_date),
      sortable: true
    },
    {
      name: 'Status Expire',
      selector: row => <span className={`badge rounded-pill ${row.status == 0 ? 'text-bg-danger' : 'text-bg-success'}`}>
        {row.status == 0 ? 'Kadaluarsa' : 'Aman'}
      </span>,
      sortable: true,
      grow: 500
    },
    {
      name: 'Adjust Stok',
      cell: (row) =>
        row.status == 1 ? <div className="button-group">
          <button className="btn-primary btn-sm btn" onClick={() => handleAdjustStock(row.batch_code, row.product_barcode)}>
            <i className="bx bx-plus"></i>
          </button>
        </div> : <small className="text-muted">Tidak dapat ditambah</small>
    }, {
      name: 'Return Batch',
      cell: (row) =>
        <button className="btn-danger btn-sm btn" onClick={() => handleReturnBatch(row.batch_code, row.product_barcode)}>
          <i className="bx bx-power-off"></i>
        </button>
    },
  ]
  const getBatch = async () => {
    setProgress(true);
    await batchstockAPI.get_batch(page, limit, keyword)
      .then((response) => {
        setDataTable(response.results)
      })
    setProgress(false)
  }
  const handleSearch = (value) => {
    setKeyword(value);
  }
  useEffect(() => {
    getBatch()
  }, [keyword, page])
  useEffect(() => {
    document.title = 'Batch & Stock';
    getBatch()
  }, []);

  const handleAdjustStock = (batch_id, barcode) => {
    Swal.fire({
      title: 'Update Stock',
      text: 'Jumlah',
      showCancelButton: true,
      input: "number",
      confirmButtonText: "Simpan",
      icon: "question",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Apakah anda yakin menyimpan stok baru?',
          showCancelButton: true,
          confirmButtonText: "Simpan",
          icon: "question",
        }).then(async (confirm) => {
          if (confirm.isConfirmed) {
            await batchstockAPI.adjust_stock(batch_id, result.value, getUser().user.userId, barcode).then(() => {
              Swal.fire({
                title: 'Stock berhasil di update',
                icon: 'success'
              });
            })
            setTimeout(() => {
              getBatch();
            }, 1000)
          }
        })
      }
    });
  }
  const handleReturnBatch = (batch_id, barcode) => {
    Swal.fire({
      title: 'Apakah anda akan menghapus batch?',
      showCancelButton: true,
      confirmButtonText: "Hapus",
      icon: "question",
    }).then(results => {
      if (results.isConfirmed) {
        batchstockAPI.delete_batch(batch_id, barcode).then(() => {
          Swal.fire({
            title: 'Data berhasil di hapus',
            icon: 'success'
          })
          getBatch()
        })
      }
    })
  }
  // Handle form
  const [productName, setProductName] = useState('');
  const [productBarcode, setProductBarcode] = useState('');
  const handleTargetValueSearch = (value) => {
    setProductName(value.product_name.trim());
    setProductBarcode(value.barcode.trim());
  }
  const [batchCode, setBatchCode] = useState('');
  const [batchExpireDate, setBatchExpireDate] = useState('')
  const [batchStock, setBatchStock] = useState('');
  const [filterState, setFilterState] = useState({});
  const handleSubmitBatch = (e) => {
    e.preventDefault();
    if (productBarcode == '') {
      return Swal.fire({
        title: 'Produk tidak boleh kosong',
        icon: 'error'
      })

    }
    const data = {
      batch_code: batchCode,
      expire_date: batchExpireDate,
      product_barcode: productBarcode,
      stock: batchStock
    }
    Swal.fire({
      title: 'Apakah data akan disimpan?',
      text: 'Pastikan data yang anda masukan benar',
      showCancelButton: true,
      confirmButtonText: "Simpan",
      icon: "question",
    }).then(results => {
      if (results.isConfirmed) {
        batchstockAPI.create_batch(data).then(response => {
          Swal.fire({
            title: 'Data berhasil disimpan',
            icon: 'success'
          });
          setBatchCode('');
          setBatchExpireDate('');
          setProductBarcode('');
          setProductName('');
          setBatchStock('');
          getBatch();
        })
      }
    })

  }
  const [loading, setLoading] = useState(false);
  const handleExport = async (data) => {
    const filterData = {
      kadaluarsa,
      aman,
      stokKosong,
      stokTidakKosong
    }
    data = { ...data, ...filterData };
    setLoading(true);
    await batchstockAPI.exportBatch(data);
    setLoading(false);
  }
  const handleFilter = (data) => {
    // setFilterState(data)
    // console.log(data)
  }
  const rowStyle = [
    {
      when: row => row.stock <= 3,
      style: {
        color: 'rgba(255, 193, 7,0.9)',
        '&:hover': {
          color: 'rgba(255, 193, 7,0.8)',
        },
      },
    },
    {
      when: row => row.stock <= 0,
      style: {
        color: 'rgba(220, 53, 69,0.8)',
        '&:hover': {
          color: 'rgba(220, 53, 69,0.8)',
        },
      },
    },
  ]
  const [kadaluarsa, setKadaluarsa] = useState(false);
  const [aman, setAman] = useState(false);
  const [stokKosong, setStokKosong] = useState(false);
  const [stokTidakKosong, setStokTidakKosong] = useState(false);
  const Filter = () => {
    // hanya stock kosong, tidak masuk stock kosong, all
    // status : kadaluarsa, aman

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <span>Filter Expire Date</span>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" checked={kadaluarsa} onChange={(e) => kadaluarsa ? setKadaluarsa(false) : setKadaluarsa(true)} />
              <label className="form-check-label">Kadaluarsa</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" checked={aman} onChange={() => aman ? setAman(false) : setAman(true)} />
              <label className="form-check-label">Aman</label>
            </div>
          </div>
          <div className="col-md-6">
            <span>Filter Stok</span>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" checked={stokKosong} onChange={() => stokKosong ? setStokKosong(false) : setStokKosong(true)} />
              <label className="form-check-label">Stok kosong</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" checked={stokTidakKosong} onChange={() => stokTidakKosong ? setStokTidakKosong(false) : setStokTidakKosong(true)} />
              <label>Stok tidak kosong</label>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      <Loading show={loading} text={'Prosess'} />
      <div className="page-header w-100 bg-white p-2 mt-3">
        <h4>Batch & Stok</h4>
      </div>
      <Tabs button={button}>
        <div className="tab-pane fade show active" id="nav-batch" role="tabpanel" aria-labelledby="nav-home-tab">
          <NewTable
            data={dataTable.data}
            rows={dataTable.totalItems}
            columns={columns}
            limit={limit}
            onChangePage={page => setPage(page)}
            onSearch={handleSearch}
            onExport={handleExport}
            // exportFilter={false}
            // filter={<Filter callback={handleFilter} />}
            rowStyle={rowStyle}
            progress={progress}
          />
        </div>
        <div className="tab-pane fade" id="nav-add-batch" role="tabpanel" aria-labelledby="nav-profile-tab">
          <div className="row">
            <div className="col-md-6">
              <SearchProduct
                targetValue={handleTargetValueSearch} />
              <div className="form-group">
                <label htmlFor="">Nama Produk</label>
                <input type="text" className="form-control form-control-sm" readOnly disabled value={productName} />
              </div>
              <div className="form-group">
                <label htmlFor="">Nama Barcode</label>
                <input type="text" className="form-control form-control-sm" readOnly disabled value={productBarcode} />
              </div>
            </div>
            <div className="col-md-6">
              <form onSubmit={handleSubmitBatch}>
                <div className="form-group">
                  <label htmlFor="">Kode Batch</label>
                  <input type="text" className="form-control form-control-sm" value={batchCode} onChange={(e) => setBatchCode(e.target.value.trim())} required />
                </div>
                <div className="form-group">
                  <label htmlFor="">Tanggal Expire</label>
                  <input type="date" className="form-control form-control-sm" value={batchExpireDate} onChange={(e) => setBatchExpireDate(e.target.value.trim())} required />
                </div>
                <div className="form-group">
                  <label htmlFor="">Stok</label>
                  <input type="number" className="form-control form-control-sm" value={batchStock} onChange={(e) => setBatchStock(e.target.value.trim())} required />
                </div>
                <div className="form-group d-flex gap-2 justify-content-end">
                  <button className="btn btn-sm btn-primary">
                    Simpan
                  </button>
                  <button className="btn btn-sm btn-danger">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  )
}