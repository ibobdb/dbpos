import { useEffect, useState } from "react"

export default function DateFilter({ onChange, type = 'load' }) {
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
    onChange(data)
  }
  useEffect(() => {
    const startDate = `${year}-${month}-${day}`;
    const endDate = `${endYear}-${endMonth}-${endDay}`;
    const data = { startDate, endDate }
    onChange(data)
  }, [])
  return (
    <div className="row filter p-2">
      <h5 className="text-muted">Hari Ini: {currentDate.toLocaleDateString('ID')}</h5>
      <span className="text-muted">Tanggal mulai dan akhir</span>
      <div className="col-md-1">
        <select value={day} className="form-select form-select-sm" onChange={(e) => setDay(e.target.value)}>
          {dayOptions.map((dayOption) => (
            <option key={dayOption} value={dayOption}>
              {dayOption}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-1">
        <select value={month} className="form-select form-select-sm" onChange={(e) => setMonth(e.target.value)}>
          {monthOptions.map((monthOption) => (
            <option key={monthOption} value={monthOption}>
              {new Date(0, monthOption - 1).toLocaleString('id-ID', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-1">
        <select value={year} className="form-select form-select-sm" onChange={(e) => setYear(e.target.value)}>
          {yearOptions.map((yearOption) => (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </select>
      </div>
      -
      <div className="col-md-1">
        <select value={endDay} className="form-select form-select-sm" onChange={(e) => setEndDay(e.target.value)}>
          {dayOptions.map((dayOption) => (
            <option key={dayOption} value={dayOption}>
              {dayOption}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-1">
        <select value={endMonth} className="form-select form-select-sm" onChange={(e) => setEndMonth(e.target.value)}>
          {monthOptions.map((monthOption) => (
            <option key={monthOption} value={monthOption}>
              {new Date(0, monthOption - 1).toLocaleString('id-ID', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-1">
        <select value={endYear} className="form-select form-select-sm" onChange={(e) => setEndYear(e.target.value)}>
          {yearOptions.map((yearOption) => (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-1">
        <button className="btn btn-sm btn-primary" type="button" onClick={handleSubmit}>
          {/* <i className="bx bx-refresh pe-2"></i> */}
          {type != 'load' ? 'Export' : 'Load'}
        </button>
      </div>
    </div >
  )
}