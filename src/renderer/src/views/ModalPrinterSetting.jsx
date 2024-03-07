import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'

export default function ModalPrinterSetting(props) {
  const [store, setStore] = useState('');
  const [printer, setPrinter] = useState('');
  const [status, setStatus] = useState(false);
  const [error, setError] = useState('');
  const handleClose = () => {
    props.onClose()
  }
  const handlePrint = () => {
    api.printer.test();
  }
  const getDataPrinter = () => {
    var dataprinter = localStorage.getItem('data_printer')
    if (dataprinter == null || dataprinter == undefined) {
      setStatus(false);
      setError('Data Printer Tidak ditemukan')
    } else {
      // return JSON.stringify(dataprinter)
      const data = JSON.parse(dataprinter);
      setStore(data.store_name)
      setPrinter(data.printer_name)
    }
  }
  useEffect(() => {
    getDataPrinter()
  }, [])
  const submitData = (e) => {
    e.preventDefault();
    localStorage.setItem('data_printer', JSON.stringify({
      store_name: store,
      printer_name: printer
    }))
    setStatus(false);
    setError('Data berhasil disimpan')
    console.log('asd')
  }
  return (
    <Modal
      show={props.show}
      onHide={handleClose}
      backdrop="static"
      keyboard={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Pengaturan Printer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submitData}>
          <small className={`${status ? 'd-none' : ``}`}>
            {status ? '' : error}
          </small>
          <div className="form-group">
            <label > Nama Printer (Shared Printer Name)</label>
            <input type="text" className="form-control form-control-sm" placeholder='kasir-printer' value={printer} onChange={(e) => setPrinter(e.target.value)} required />
          </div>
          <small className='text-primary'>Jangan lupa untuk disimpan, jika melakukan perubahan nama printer restart aplikasi dan test printer</small>
          <div className="button-group d-flex justify-content-end gap-2">
            <button className='btn btn-sm btn-primary' type='submit'>
              Simpan
            </button>
            <button className="btn btn-sm btn-primary" type='button' onClick={() => handlePrint()}>
              Test Printer
              <i className="bx bx-printer ps-2"></i>
            </button>
          </div>
        </form>

      </Modal.Body>
    </Modal >
  )
}