export default function PageFilter() {
  return (
    <div className="p-2 my-2">
      <h5>Filter</h5>
      <div className="form-filter d-flex justify-content-between gap-4">
        <input type="text" className="form-control form-control-sm" />
        <input type="text" className="form-control form-control-sm" />
        <input type="text" className="form-control form-control-sm" />

      </div>
    </div>
  )
}