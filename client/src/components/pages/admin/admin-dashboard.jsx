import React, { useEffect, useState } from "react";
import "../../../styles/pages/admin/admin-main.css";
import "../../../styles/pages/admin/admin-dashboard.css";
import AdminSidebar from "./admin-sidebar";
import {
  BsFillPersonPlusFill,
  BsTicketPerforatedFill,
  BsCurrencyDollar,
} from "react-icons/bs";
function AdminDashboard(props) {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    var toplam = 0;
    for (var i = 0; i < props.data.length; i++) {
      toplam += props.data[i].price;
    }
    setTotalPrice(toplam);
  }, []);

  return (
    <div
      className={
        props.theme
          ? "admin-dashboard admin light"
          : "admin-dashboard admin dark"
      }
    >
      <AdminSidebar theme={props.theme} />
      <div className="main">
        <h2 className="header">GÖSTERGE PANELİ</h2>
        <p className="description">Detaylı bilgiler</p>
        <div className="dashboard-grid">
          <div className="dashboard-grid-item">
            <div>
              <h2>{props.users.length}</h2>
              <p>Kullanıcı kaydı</p>
            </div>
            <BsFillPersonPlusFill className="dashboard-icon" />
          </div>
          <div className="dashboard-grid-item">
            <div>
              <h2>{props.data.length}</h2>
              <p>Satılan bilet</p>
            </div>
            <BsTicketPerforatedFill className="dashboard-icon" />
          </div>
          <div className="dashboard-grid-item">
            <div>
              <h2>{totalPrice}</h2>
              <p>Elde edilen gelir</p>
            </div>
            <BsCurrencyDollar className="dashboard-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
