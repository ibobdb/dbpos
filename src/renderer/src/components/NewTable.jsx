
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import loadingsvg from '../assets/loading-color.svg'
import Loading from './Loading';
import { Modal } from 'react-bootstrap'
import ExportFilter from './ExportFilter';
import ModalExport from '../views/ModalExport';

export default function NewTable({ columns, data, rows, limit, title, onChangePage, onSearch, rowStyle, isExport = true, progress, exportFilter, exportFilterDate, filter, onExport }) {
  const [keyword, setKeyword] = useState('');
  const [modal, setModal] = useState(false);
  const filterDate = (data) => {
    if (exportFilter) {
      return exportFilterDate(data);
    }
    return
  }
  const handleSearch = (value) => {
    setKeyword(value)
    onSearch(value)
  }

  const openModal = () => {
    setModal(true)
  }
  const closeModal = () => {
    setModal(false)
  }


  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <div className="input-group input-group-sm px-2">
              <input type="text" className="form-control form-control-sm" placeholder="Cari barcode,nama produk" value={keyword} onChange={(e) => handleSearch(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          {isExport ? <div className="button-group d-flex gap-2 justify-content-end">
            <button className='btn btn-primary btn-sm' onClick={openModal}>
              <i className='bx bx-printer'></i>
              <span className="ps-2">
                CSV/EXCEL
              </span>
            </button>
          </div> : ''}
        </div>
      </div>
      <DataTable
        fixedHeader={true}
        title={title}
        columns={columns}
        data={data}
        highlightOnHover={true}
        pagination={true}
        paginationServer={true}
        paginationTotalRows={rows}
        paginationPerPage={limit}
        paginationComponentOptions={{
          noRowsPerPage: true
        }}
        pointerOnHover={true}
        onChangePage={onChangePage}
        responsive={true}
        conditionalRowStyles={rowStyle}
        progressPending={progress}
        progressComponent={<div className='mt-3'>  <img src={loadingsvg} alt="loading" height={50}
          width={50} />loading....</div>}
      />
      {/* Modal */}
      <ModalExport
        exportFilter={exportFilter}
        show={modal}
        onClose={closeModal}
        filterDate={filterDate}
        otherFilter={filter}
        onExport={onExport}
      />
    </div>

  )
}