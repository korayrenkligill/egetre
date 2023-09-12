import React from 'react'
import '../../../styles/pages/admin/admin-main.css'
import '../../../styles/pages/admin/admin-theatrelist.css'
import AdminSidebar from './admin-sidebar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AdminTheatreList(props) {
  const navigate = useNavigate();
  const removeTheatre = (theatreId) => {
    axios.post('http://localhost:3001/remove/theatre', { id: theatreId })
        .then((res) => {
        console.log(res.data);
        })
        .then(()=>{
            window.location.reload();
        })
        .catch((err) => {
        console.error(err);
        });
}
  return (
    <div className={props.theme ? 'admin-theatrelist admin light' : 'admin-theatrelist admin dark'}>
        <AdminSidebar theme={props.theme}/>
        <div className="main">
          <h2 className='header'>TİYATRO LİSTESİ</h2>
          <p className='description'>Gösterilerin listesi</p>
          <div className='list'>
                <div className='list-header'>
                    <div className='image-column'>Görsel</div>
                    <div className='name-column'>Adı</div>
                    <div className='description-column'>Açıklaması</div>
                    <div className='price-column'>Fiyatı</div>
                    <div className='actions-column'>Hareketler</div>
                </div>
                {props.theatres.map((theatre,theatreKey)=>{
                  return(
                    <div className="list-item" key={theatreKey}>
                      <div className='list-column image-column'>
                        <img src={theatre.image} alt=""/>
                      </div>
                      <div className='list-column name-column'>
                        <span className="name">{theatre.name}</span>
                      </div>
                      <div className='list-column description-column'>
                        {theatre.trailer}
                      </div>
                      <div className='list-column price-column'>
                          {theatre.price}₺
                      </div>
                      <div className='list-column actions-column'>
                        <button className='action-button'>Hareketler</button>
                        <div className='theatre-actions'>
                          <button onClick={()=>{navigate(`/admin/theatre-list/${theatre.id}`)}}>Düzenle</button>
                          <button onClick={()=>{removeTheatre(theatre.id)}}>Kaldır</button>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
        </div>
    </div>
  )
}

export default AdminTheatreList