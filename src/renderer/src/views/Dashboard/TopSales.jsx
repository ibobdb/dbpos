import { rupiah } from "../../common/numberFormat"

export default function TopSales({ data }) {
  return (
    <div className="table-responseive">
      <table className="table table-striped table-sm">
        <thead>
          <tr >
            <th className="text-muted">No</th>
            <th className="text-muted">Produk</th>
            <th className="text-muted">Total Penjualan</th>
            <th className="text-muted">Kontribusi</th>
          </tr>
        </thead>
        <tbody >
          {data && data.map((item, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.product_name}</td>
                <td>{rupiah(item.total)}</td>
                <td>{item.kontribusi}%</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}