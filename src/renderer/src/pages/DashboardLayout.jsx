import Dashboard from "./Dashboard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Category from "./Category";
import Product from "./Product";
import Batch from "./Batch";
import Discount from "./Discount";
import Transaction from "./Transaction";
import { Routes, Route } from "react-router-dom";
import Users from './Users'
import Store from './Store'
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
// import { useGlobalState } from "../context/globalStateContext";
// import PageLoading from "../components/PageLoading";
export default function DashboardLayout() {
  // const navigate = useNavigate();
  // const checkRoles = (token) => {
  //   const decode = jwtDecode(token);
  //   const userRole = decode.userRoles;
  //   if (!userRole) {
  //     if (userRole == 'kasir') {
  //       navigate('/cashier');
  //     } else {
  //       navigate('/login');
  //     }
  //   }
  // }
  // useEffect(() => {
  //   const token = sessionStorage.getItem('token');
  //   if (token) {
  //     checkRoles(token)
  //   }
  // }, [])
  // const { pageLoading } = useGlobalState()
  return (
    <div className="">
      {/* <PageLoading show={pageLoading} /> */}
      <Navbar />
      <Sidebar />
      <div className="container-fluid">
        {/* <ToastContainer /> */}
        <div className="row">
          <main className="col-md-12 ms-sm-auto">
            {/* Dinamic content */}
            <Routes>
              <Route exact path="/" Component={Dashboard} />
              <Route exact path="/category" Component={Category} />
              <Route exact path="/product" Component={Product} />
              <Route exact path="/transaction" Component={Transaction} />
              <Route exact path="/discount" Component={Discount} />
              <Route path="/users" Component={Users} />
              <Route path="/store" Component={Store} />
              {/* <Route path="/db-setting" Component={DatabaseSettings} /> */}
              <Route exact path="/batchstock" Component={Batch} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}