
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext'
export default function SideBar() {
  const { getUser } = useAuth();
  const data = [
    {
      section: 'Halaman Utama',
      list: [
        {
          name: "Dashboard",
          href: "/",
          icon: "bx bxs-package pe-2",
          roles: ['master']
        },
      ]
    },
    {
      section: 'Kelola Produk',
      list: [
        {
          name: "Kategori",
          href: "/category",
          icon: "bx bx-category pe-2",
          roles: ['master', 'admin', 'inventory']
        },
        {
          name: "Produk",
          href: "/product",
          icon: "bx bx-box pe-2",
          roles: ['master', 'admin', 'inventory']
        },
        {
          name: "Batch & Stok",
          href: "/batchstock",
          icon: "bx bx-package pe-2",
          roles: ['master', 'admin', 'inventory']
        }
      ]
    },
    {
      section: 'Diskon',
      list: [
        {
          name: 'Daftar Diskon',
          href: '/discount',
          icon: 'bx bxs-discount pe-2',
          roles: ['master', 'admin', 'inventory']
        },
      ]
    },
    {
      section: 'Laporan',
      list: [
        {
          name: "Transaksi",
          href: "/transaction",
          icon: "bx bx-dollar-circle pe-2",
          roles: ['master', 'admin']
        },
      ]
    },
    {
      section: 'Pengguna',
      list: [
        {
          name: "Daftar Pengguna",
          href: "/users",
          icon: "bx bx-user pe-2",
          roles: ['master']
        },
      ]
    },
    {
      section: 'Lainnya',
      list: [
        {
          name: "Pengaturan Toko",
          href: "/store",
          icon: "bx bx-data pe-2",
          roles: ['master']
        },
        {
          name: "Kasir",
          href: "/cashier",
          icon: "bx bx-cart-download pe-2",
          roles: ['master', 'admin', 'cashier']
        },
      ]
    }
  ]

  return (
    <div className={`sidebar`}>
      {data.map((section, sectionIndex) => {
        const filteredList = section.list.filter(item => {
          return item.roles.some(role => role == getUser()?.user.userRoles);
        });
        const filteredMenu = {
          ...section,
          list: filteredList
        }

        return (
          <div key={sectionIndex} className='list-wrapper'>
            {filteredMenu.list.length != 0 ?
              <li className="nav-item">
                <h6 className="sidebar-heading d-flex justify-content-between align-items-center text-muted">
                  <span>{filteredMenu.section}</span>
                </h6>
              </li> : ''
            }
            {filteredMenu.list.map((list, listIndex) => {
              return (
                <li className="nav-item" key={listIndex}>
                  <Link to={list.href} className='nav-link'>
                    <span className={list.icon}></span>
                    {list.name}
                  </Link>
                </li>
              )
            })}
          </div>
        )
      })}
    </div>

  );
}
