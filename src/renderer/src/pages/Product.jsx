import Tabs from '../components/Tabs'

import { useState, useEffect, Suspense } from 'react';
import productAPI from '../api/productAPI';
import NewTable from '../components/NewTable'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import ModalUpdateProduct from '../views/ModalUpdateProduct';
import categoryAPI from '../api/categoryAPI';
import { useGlobalState } from '../context/globalStateContext';
import { dateFormat, rupiah, replaceNumberFormat, clearNumberFormat } from '../common/numberFormat';
import Loading from '../components/Loading';
export default function Product() {
  const button = [
    {
      buttonText: 'Produk',
      target: '#nav-product',
      key: 'product'
    },
    {
      buttonText: 'Tambah Produk',
      target: '#nav-add-product',
      key: 'add-product'
    }
  ]
  const [selectedBatch, setSelectedBatch] = useState({});
  const columns = [
    // {
    //   name: 'Diskon Status',
    //   selector: row => row.discount_id == null ? '-' : <span className='badge rounded-pill text-bg-primary'>Aktif</span>,
    //   reorder: true,
    //   grow: 50
    // },
    {
      name: 'Barcode',
      selector: row => <span className='fw-bold'>{row.barcode}</span>,
      reorder: true,
      grow: 3000,

    },
    {
      name: 'Nama Produk',
      selector: row => <span className='text-uppercase'>{row.product_name}</span>,
      grow: 5000,
      wrap: true
    },
    {
      name: 'Harga Modal',
      selector: row => rupiah(row.cost),
      grow: 1000
    },
    {
      name: 'Harga Jual',
      selector: row => rupiah(row.price),
      grow: 1000
    },
    {
      name: 'Nomor Batch',
      cell: (row) =>
        <select className='form-select form-select-sm'
          value={selectedBatch[row.barcode]?.batch_code || ''}
          onChange={(e) => handleBatchCodeChange(e, row)}>
          <option value=''>Pilih Batch</option>
          {row.batch_list && row.batch_list.map((batch, i) => {
            return <option value={batch.batch_code} key={i}>{batch.batch_code}</option>
          })}
        </select>,
      grow: 3000
    },
    {
      name: 'Expire Date',
      selector: row => selectedBatch[row.barcode]?.expire_date && dateFormat(selectedBatch[row.barcode]?.expire_date) || '-',
      grow: 50
    },
    {
      name: 'Stok per Batch',
      selector: row => selectedBatch[row.barcode]?.stock || '-',

    },
    {
      name: 'Stok Keseluruhan',
      selector: row => row.stock || '0',

    },
    {
      name: 'Kategori',
      selector: row => row.category?.name || <span className='badge rounded-pill text-bg-warning'>Belum di set</span>,
      grow: 50
    },
    // {
    //   name: 'Diskon',
    //   selector: row => row.discount?.discount_name || '-',
    //   grow: 50
    // },
    // {
    //   name: 'Type Diskon',
    //   selector: row => row.discount?.discount_type || '-',

    // },
    // {
    //   name: 'Nilai Diskon',
    //   selector: row => row.discount?.discount_value || '-',

    // },
    {
      name: 'Perintah',
      cell: (row) => <div div className='d-flex gap-2'>
        <button className="btn btn-danger btn-sm" type="button" onClick={() => onDeleteProduct(row.barcode)}><i className="bx bx-trash"></i></button>
        <button className="btn btn-primary btn-sm" type="button" onClick={() => onUpdateProduct(row.barcode)}><i className="bx bx-pencil"></i></button>
      </div>
      ,
      ignoreRowClick: true,
      allowoverflow: true,
    },
  ]
  const { updatePageLoading } = useGlobalState();
  const [dataTable, setDataTable] = useState({});
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [modal, setModal] = useState(false);
  const [dataId, setDataId] = useState('');
  const [progress, setProgress] = useState(true);
  const [loading, setLoading] = useState(false)
  const getProduct = async () => {
    try {
      setProgress(true);
      const response = await productAPI.getProduct(page, limit, keyword);
      setDataTable(response.results)
      setProgress(false)
    } catch (error) {
      setDataTable({})
    }
  }
  const handleBatchCodeChange = (e, row) => {
    const selectedCodes = e.target.value;
    setSelectedBatch(prevSelectedBatch => ({
      ...prevSelectedBatch,
      [row.barcode]: row.batch_list.find(batch => batch.batch_code === selectedCodes) || {},
    }));
  }
  const onDeleteProduct = (barcode) => {
    Swal.fire({
      title: "Apakah data akan di hapus?",
      showCancelButton: true,
      confirmButtonText: "Save",
      icon: "question"
    }).then(async (result) => {
      if (result.isConfirmed) {
        updatePageLoading(true)
        await productAPI.deleteProduct(barcode)
          .then(() => {
            toast.success('Data berhasil di hapus', {
              position: "top-right",
              autoClose: 2000,
              progress: undefined,
              theme: "light",
            });
            getProduct();
          })
        updatePageLoading(false)
      }
    });

  }
  const onUpdateProduct = (barcode) => {
    setModal(true);
    setDataId(barcode)
  }

  const handleSearch = (value) => {
    setKeyword(value)
  }
  // Hanlde Modal
  const handleCloseModal = () => {
    setModal(false)
  }
  // Form Add Product
  const [barcode, setBarcode] = useState('');
  const [genereateBarcode, setGenerateBarcode] = useState(false);
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState(0);
  const [cost, setCost] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const handleBarcode = (e) => {
    const value = e.target.value
    setBarcode(value);
  }
  const handleGenerateBarcode = (e) => {
    const value = e.target.value;
    if (genereateBarcode) {
      setGenerateBarcode(false)
    } else {
      setGenerateBarcode(true)
    }
    setBarcode('');
  }
  const handleProductName = (e) => {
    const value = e.target.value
    setProductName(value);
  }
  const handleCategory = (e) => {
    const value = e.target.value
    setCategory(value);
  }
  const handleCost = (e) => {
    const value = e.target.value
    const formated = replaceNumberFormat(value)
    setCost(formated);
  }
  const handlePrice = (e) => {
    const value = e.target.value
    const formated = replaceNumberFormat(value)
    setPrice(formated);
  }
  const handleStock = (e) => {
    const value = e.target.value
    setStock(value);
  }
  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      barcode: barcode,
      product_name: productName,
      cost: clearNumberFormat(cost),
      price: clearNumberFormat(price),
      stock: stock,
      category_id: category
    }
    updatePageLoading(true)
    await productAPI.addProduct(data)
      .then(() => {
        toast.success('Data berhasil disimpan', {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
        })
        setBarcode('')
        setProductName('')
        setCategory(0)
        setPrice('')
        setCost('')
        setStock(0)
        getProduct(page, limit)
      }).catch(error => {
        toast.error('Permintaan gagal, isi form dengan benar', {
          position: "top-right",
          autoClose: 2000,
          progress: undefined,
          theme: "light",
        });
      })
    updatePageLoading(false)
  }
  const handleReloadData = () => {
    getProduct(page, limit, keyword)
  }
  // Handle Category List
  const [categoryList, setCategoryList] = useState([]);
  const getCategoryList = async () => {
    await categoryAPI.getCategory().then((response) => {
      setCategoryList(response.results.data)
    })
  }
  useEffect(() => {
    getProduct();
    getCategoryList()
    document.title = 'Produk'
  }, [keyword, page])
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
  const handleExport = async () => {
    setLoading(true);
    await productAPI.exportProduct();
    setLoading(false);
  }
  return (
    <div>
      <Loading show={loading} text={'Prosess...'} />
      <div className="page-header w-100 bg-white p-2 mt-3">
        <h4>Kelola Produk</h4>
      </div>
      <Tabs button={button}>
        <div className="tab-pane fade show active" id="nav-product" role="tabpanel" aria-labelledby="nav-home-tab">
          <NewTable
            data={dataTable.data}
            rows={dataTable.totalItems}
            columns={columns}
            limit={limit}
            onChangePage={page => setPage(page)}
            onSearch={handleSearch}
            rowStyle={rowStyle}
            progress={progress}
            onExport={handleExport}
          />
        </div>
        <div className="tab-pane fade" id="nav-add-product" role="tabpanel" aria-labelledby="nav-profile-tab">
          <form method='post' onSubmit={onSubmit} >
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label>Barcode</label>
                  <input type="text" className="form-control form-control-sm" onChange={handleBarcode} value={barcode} disabled={genereateBarcode} required={!genereateBarcode} />
                  <div class="form-check mt-2">
                    <input className="form-check-input" type="checkbox"
                      id="flexRadioDefault1" onChange={(e) => handleGenerateBarcode(e)} />
                    <label className="form-check-label" for="flexRadioDefault1">
                      <small className='text-muted'>Generate Barcode</small>
                    </label>
                  </div>
                  <small className='text-muted'>Jika produk tidak memiliki <span className='fw-bold'>barcode</span>, sistem akan generate secara otomatis berdasarkan nama produk</small>

                </div>
                <div className="form-group">
                  <label>Nama Produk</label>
                  <input type="text" className="form-control form-control-sm" onChange={handleProductName} value={productName} />
                </div>
                <div className="form-group">
                  <label>Kategori</label>
                  <select value={category} className="form-select form-select-sm" onChange={handleCategory}>
                    <option>Pilih Kategori</option>
                    {categoryList && categoryList.map((list, i) => {
                      return <option value={list.id} key={i}>{list.name}</option>
                    })}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Harga Modal</label>
                  <input type="text" className="form-control form-control-sm" onChange={handleCost} value={cost} placeholder='0' />
                </div>
                <div className="form-group">
                  <label>Harga Jual</label>
                  <input type="text" className="form-control form-control-sm" onChange={handlePrice} value={price} placeholder='0' />
                </div>
              </div>
            </div>
            <div className="form-group d-flex gap-2 my-3">
              <button className="btn btn-primary btn-sm" type="submit">Simpan</button>
              <button className="btn btn-danger btn-sm" type="reset">Reset</button>
            </div>
          </form>
        </div>
      </Tabs>
      {/* Modal */}
      <ModalUpdateProduct
        show={modal}
        onClose={handleCloseModal}
        dataId={dataId}
        reloadData={handleReloadData}
      />
    </div>
  );
}
