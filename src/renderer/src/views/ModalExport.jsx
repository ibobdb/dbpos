import { Modal } from 'react-bootstrap'
import { useState, useEffect } from 'react'
export default function ModalExport(props) {
  const currentDate = new Date();
  const [day, setDay] = useState(currentDate.getDate());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());
  // End Date
  const [endDay, setEndDay] = useState(currentDate.getDate());
  const [endMonth, setEndMonth] = useState(currentDate.getMonth() + 1);
  const [endYear, setEndYear] = useState(currentDate.getFullYear());
  // Menghasilkan opsi untuk tanggal (1-31)
  const dayOptions = Array.from({ length: 31 }, (_, index) => index + 1);
  // Menghasilkan opsi untuk bulan (Januari-Desember)
  const monthOptions = Array.from({ length: 12 }, (_, index) => index + 1);
  // Menghasilkan opsi untuk tahun (sekarang hingga 7 tahun ke depan)
  const yearOptions = Array.from({ length: 20 }, (_, index) => 2020 + index);
  const handleSubmit = () => {
    const startDate = `${year}-${month}-${day}`;
    const endDate = `${endYear}-${endMonth}-${endDay}`;
    const data = { startDate, endDate }
    props.onExport(data);
  }
  const handleClose = () => {
    props.onClose()
  }
  const DateFilter = () => {
    return (
      <div>
        Tanggal Awal
        <div className="row mb-2">
          <div className="col-md-4">
            <select value={day} className="form-select form-select-sm" onChange={(e) => setDay(e.target.value)}>
              {dayOptions.map((dayOption) => (
                <option key={dayOption} value={dayOption}>
                  {dayOption}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <select value={month} className="form-select form-select-sm" onChange={(e) => setMonth(e.target.value)}>
              {monthOptions.map((monthOption) => (
                <option key={monthOption} value={monthOption}>
                  {new Date(0, monthOption - 1).toLocaleString('id-ID', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <select value={year} className="form-select form-select-sm" onChange={(e) => setYear(e.target.value)}>
              {yearOptions.map((yearOption) => (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              ))}
            </select>
          </div>

        </div>
        Tanggal Akhir
        <div className="row mb-2">
          <div className="col-md-4">
            <select value={endDay} className="form-select form-select-sm" onChange={(e) => setEndDay(e.target.value)}>
              {dayOptions.map((dayOption) => (
                <option key={dayOption} value={dayOption}>
                  {dayOption}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <select value={endMonth} className="form-select form-select-sm" onChange={(e) => setEndMonth(e.target.value)}>
              {monthOptions.map((monthOption) => (
                <option key={monthOption} value={monthOption}>
                  {new Date(0, monthOption - 1).toLocaleString('id-ID', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <select value={endYear} className="form-select form-select-sm" onChange={(e) => setEndYear(e.target.value)}>
              {yearOptions.map((yearOption) => (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    )
  }
  return (
    <Modal
      show={props.show}
      onHide={handleClose}
      backdrop="static"
      keyboard={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Export</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.exportFilter || props.otherFilter ?
          <div>
            {props.exportFilter ? <DateFilter /> : ''}
            {/* filter lainnya */}
            {props.otherFilter ? props.otherFilter : ''}
          </div>
          : <span className='text-muted'>Tidak ada filter tersedia</span>}
        <div className="row">
          <div className="col-md-12 d-flex justify-content-end">
            <button className="btn btn-sm btn-primary" type="button" onClick={handleSubmit}>
              Export
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal >
  )
}