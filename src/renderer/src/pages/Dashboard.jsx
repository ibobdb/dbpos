import { useEffect, useState } from "react";
import DateFilter from "../components/DateFilter";
import Axios from 'axios';
import Loading from '../components/Loading'
import TopProduct from "../views/Dashboard/TopProduct";
import { rupiah } from "../common/numberFormat";
import SalesStat from '../views/Dashboard/SalesStat'
import TopSales from "../views/Dashboard/TopSales";
import SalesPerYear from "../views/Dashboard/SalesPerYear";
import EmptyData from "../components/EmptyData";
import WarningStock from "../views/Dashboard/WarningStock";
export default function Dashboard() {
  const [data, setData] = useState({});
  const [statYear, setStatYear] = useState(new Date().getFullYear())
  const dateChange = async (date) => {
    await getData(date)
  }
  const getData = async (date) => {
    try {
      await Axios.get(`${import.meta.env.RENDERER_VITE_BASE_URL}/dashboard?start=${date.startDate}&end=${date.endDate}`)
        .then(response => {
          setData(response.data.results);
        });
    } catch (error) {
      throw error
    }
  }
  useEffect(() => {
    document.title = 'Dashboard'
  }, [])
  return (
    <div>
      <div className="page-header w-100 bg-white p-2 mt-3">
        <h4>Dashboard</h4>
      </div>
      <DateFilter
        onChange={dateChange}
      />
      <div className="row">
        <div className="col-md-3">
          <div className="shadow shadow-sm box-row">
            <div className="d-flex justify-content-between">
              <div className="w-100">
                <span className="text-muted fs-5">Total Transaksi</span>
                <h3>{data.total_transaction && rupiah(data.total_transaction)}</h3>
              </div>
              <span className="bx bx-dollar fs-5"></span>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="shadow shadow-sm box-row">
            <div className="d-flex justify-content-between">
              <div className="w-100">
                <span className="text-muted fs-5">Total Produk Terjual</span>
                <h3>{data.total_product_sales && rupiah(data.total_product_sales)}</h3>
              </div>
              <span className="bx bx-dollar fs-5"></span>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="shadow shadow-sm box-row">
            <div className="d-flex justify-content-between">
              <div className="w-100">
                <span className="text-muted fs-5">Total Penjualan</span>
                <h3>{data.total_sales && rupiah(data.total_sales)}</h3>
              </div>
              <span className="bx bx-dollar fs-5"></span>
            </div>
            <small className="text-success">10% <span className="bx bx-up-arrow-alt"></span></small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="shadow shadow-sm box-row">
            <div className="d-flex justify-content-between">
              <div className="w-100">
                <span className="text-muted fs-5">Modal</span>
                <h3>{data.total_cost && rupiah(data.total_cost.map(item => item.total))}</h3>
              </div>
              <span className="bx bx-dollar fs-5"></span>
            </div>
            <small className="text-success">10% <span className="bx bx-up-arrow-alt"></span></small>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body shadow">
              <h5 className="text-muted text-uppercase">10 Produk Penjualan Paling Besar</h5>
              {data.top_sales && data.top_sales.length <= 0 ? <EmptyData /> :
                <TopSales
                  data={data.top_sales} />
              }
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body shadow">
              <h5 className="text-muted text-uppercase">10 Produk Paling Banyak Dijual</h5>
              {data.top_product && data.top_product.length <= 0 ? <EmptyData /> :
                <div className="row">
                  <div className="col-md-6">
                    <div className="top-product-sales">
                      {data.top_product && data.top_product.map((item, i) => {
                        return (
                          <li className="d-flex justify-content-between border-bottom text-muted" key={i}>
                            <span className="text-uppercase"><span>{i + 1}.</span> {item.product_name}</span>
                            <span>{item.total} Terjual</span>
                          </li>
                        )
                      })}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <TopProduct
                      data={data.top_product}
                    />
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

      </div>
      <div className="row my-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body shadow">
              <h5 class="text-muted text-uppercase">Statistik Penjualan</h5>
              <select className="form-select form-select-sm" value={statYear} onChange={(e) => setStatYear(e.target.value)}>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
              <SalesStat
                year={statYear} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body shadow">
              <h5 className="text-muted text-uppercase">Perbandingan Per Tahun</h5>
              <SalesPerYear
                data={data.compare_year}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <div className="col-md-6">
          <div className="card vh-100">
            <div className="card-body shadow">
              <h5 className="text-muted text-uppercase">Info Stok Kosong & Peringatan</h5>
              <WarningStock />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}