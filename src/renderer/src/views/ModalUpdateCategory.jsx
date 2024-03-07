import { Modal } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import categoryAPI from '../api/categoryAPI';
import { toast } from 'react-toastify';
export default function ModalUpdateCategory(props) {
  const handleClose = () => {
    props.onClose()
  }
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const onSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: name,
      description: desc
    }

    Swal.fire({
      title: "Apakah data akan diperbarui?",
      showCancelButton: true,
      confirmButtonText: "Simpan",
      icon: "question"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await categoryAPI.updateCategory(props.dataId, data).then((res) => {
          handleClose();
          props.reloadData()
          toast.success('Data berhasil disimpan', {
            position: "top-right",
            autoClose: 2000,
            theme: "light",
          });
        })

      }
    });
  }
  const getCategory = async (id) => {
    try {
      const response = await categoryAPI.getCategoryById(id);
      const data = response.results;
      setName(data.name)
      setDesc(data.description)
    } catch (error) {
      throw error
    }
  }
  useEffect(() => {
    getCategory(props.dataId)
  }, [props.dataId])
  return (
    <Modal
      show={props.show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Kategori</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form method='post' onSubmit={onSubmit} >
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="Barcode">Nama kategori</label>
                <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="Barcode">Deskripsi</label>
                <input type="text" className="form-control" onChange={(e) => setDesc(e.target.value)} value={desc} />
              </div>
            </div>
          </div>
          <div className="form-group d-flex gap-2 my-3">
            <button className="btn btn-primary btn-sm" type="submit">Simpan</button>
            <button className="btn btn-danger btn-sm" type="reset">Reset</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}