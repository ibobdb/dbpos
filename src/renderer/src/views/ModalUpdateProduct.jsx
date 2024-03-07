import { Modal } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import productAPI from '../api/productAPI';
import categoryAPI from '../api/categoryAPI';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Loading from '../components/Loading';
import { useGlobalState } from '../context/globalStateContext';
export default function ModalUpdateProduct(props) {
  const handleClose = () => {
    props.onClose()
  }
  const { updatePageLoading } = useGlobalState()
  const [barcode, setBarcode] = useState('');
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState(0);
  const [cost, setCost] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault()
    const data = {
      product_name: productName,
      cost: cost,
      price: price,
      stock: stock,
      category_id: category
    }
    Swal.fire({
      title: "Apakah data akan diperbarui?",
      showCancelButton: true,
      confirmButtonText: "Save",
      icon: "question"
    }).then(async (result) => {
      if (result.isConfirmed) {
        updatePageLoading(true)
        await productAPI.updateProduct(barcode, data).then((response) => {
          props.reloadData();
          handleClose();
          toast.success('Data berhasil disimpan', {
            position: "top-right",
            autoClose: 2000,
            theme: "light",
          });
        })
        updatePageLoading(false)
      }
    });
  }
  const getProductById = async (barcode) => {
    try {
      setLoading(true)
      const response = await productAPI.getProductById(barcode);
      const data = response.results;
      setBarcode(data.barcode)
      setCategory(data.category_id)
      setCost(data.cost)
      setPrice(data.price)
      setProductName(data.product_name)
      setStock(data.stock)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  const getCategoryList = async () => {
    await categoryAPI.getCategory().then((response) => {
      setCategoryList(response.results.data)
    })
  }
  useEffect(() => {
    getProductById(props.dataId)
    getCategoryList()
  }, [props.dataId])

  return (
    <Modal
      show={props.show}
      onHide={handleClose}
      backdrop="static"
      keyboard={true}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Produk</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Loading show={loading} text={'Loading..'} />
        <form method='post' onSubmit={onSubmit} >
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Barcode</label>
                <input type="text" className="form-control form-control-sm" value={barcode} readOnly />
              </div>
              <div className="form-group">
                <label>Nama Produk</label>
                <input type="text" className="form-control form-control-sm" onChange={(e) => setProductName(e.target.value)} value={productName} />
              </div>
              <div className="form-group">
                <label>Kategori</label>
                <select value={category} className="form-select form-select-sm" onChange={(e) => setCategory(e.target.value)} >
                  <option {...category == null || category == 0 || category < 1 ? 'selected' : ''}>Pilih Kategori</option>
                  {categoryList && categoryList.map((list, i) => {
                    return <option value={list.id} key={i} > {list.name}</option>
                  })}
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label >Harga Modal</label>
                <div className="input-group input-group-sm">
                  <span className="input-group-text">Rp</span>
                  <input type="text" className="form-control " onChange={(e) => setCost(e.target.value)} value={cost} />
                </div>
              </div>
              <div className="form-group">
                <label>Harga Jual</label>
                <div className="input-group input-group-sm">
                  <span class="input-group-text">Rp</span>
                  <input type="text" className="form-control" onChange={(e) => setPrice(e.target.value)} value={price} />
                </div>
              </div>
            </div>
            <div className="col-md-4">

            </div>
          </div>
          <div className="form-group d-flex gap-2 my-3">
            <button className="btn btn-primary btn-sm" type="submit">Simpan</button>
            <button className="btn btn-danger btn-sm" type="reset">Reset</button>
          </div>
        </form>
      </Modal.Body>
    </Modal >
  )
}