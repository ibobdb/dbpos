import { Modal } from 'react-bootstrap'
export default function ModalDetailTransaction(props) {
  const handleClose = () => {
    props.onClose()
  }
  const handlePrint = () => {
    const data = {
      transaction: props.data,
      productList: props.data.products,
      store: props.data.store
    }
    api.printer.print(data);
  }
  return (
    <Modal
      show={props.show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Detail Transaksi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="detail-transaction">
          <div className="detail-group d-flex justify-content-between">
            <span className='Member'>Tanggal :</span>
            <span className=''>{new Date(props.data.createdAt).toLocaleDateString('id-ID')}</span>
          </div>
          <div className="detail-group d-flex justify-content-between">
            <span className='fw-bold'>Transaksi ID :</span>
            <span className='fw-bold'>{props.data.id}</span>
          </div>
          <div className="detail-group d-flex justify-content-between">
            <span className='Member'>Member :</span>
            <span className=''>{props.data.member_id}</span>
          </div>
          <div className="detail-group d-flex justify-content-between">
            <span className='Member'>Diskon :</span>
            <span className=''>{props.data.discount}</span>
          </div>
          <div className="detail-group d-flex justify-content-between">
            <span className='Member'>Total Transaksi :</span>
            <span className='fw-bold'>RP {props.data.total}</span>
          </div>
          <hr />
          <div className="detail-transaction-list overflow-auto">
            <table className='table table-sm'>
              <thead>
                <tr>
                  <th>Nama Product</th>
                  <th>Qty</th>
                  <th>Diskon</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {props.data.products && props.data.products.map((item, i) => {
                  return (
                    <tr>
                      <td>{item.product_name}</td>
                      <td>{item.qty}</td>
                      <td>{item.discount}</td>
                      <td>{item.total}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <hr />
          <div className="button-group d-flex justify-content-end">
            <button className="btn btn-sm btn-primary" type='button' onClick={() => handlePrint()}>
              Print
              <i className="bx bx-printer ps-2"></i>
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal >
  )
}