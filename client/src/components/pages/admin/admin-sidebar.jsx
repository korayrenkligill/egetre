import React, { useEffect } from "react";
import "../../../styles/pages/admin/admin-side.css";
import { Link } from "react-router-dom";

function AdminSidebar(props) {
  useEffect(() => {
    document.title = "Egetre : Yönetim paneli";
  }, []);
  return (
    <div className={props.theme ? "sidebar-main light" : "sidebar-main dark"}>
      <p>Bilgilendirme</p>
      <ul>
        <li>
          <Link to="/admin">Gösterge Paneli</Link>
        </li>
      </ul>
      <p>Kullanıcı</p>
      <ul>
        <li>
          <Link to="/admin/user-list">Kullanıcı Listesi</Link>
        </li>
      </ul>
      <p>Tiyatro</p>
      <ul>
        <li>
          <Link to="/admin/theatre-list">Tiyatro Listesi</Link>
        </li>
        <li>
          <Link to="/admin/theatre-add">Tiyatro Ekle</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
