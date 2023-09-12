import React from 'react'
import '../../../styles/pages/admin/admin-main.css'
import '../../../styles/pages/admin/admin-userlist.css'
import AdminSidebar from './admin-sidebar'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function AdminUserList(props) {
    const navigate = useNavigate();
    const removeUser = (userId) => {
        axios.post('http://localhost:3001/remove/user', { id: userId })
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
    <div className={props.theme ? 'admin-userlist admin light' : 'admin-userlist admin dark'}>
        <AdminSidebar theme={props.theme}/>
        <div className="main">
            <h2 className='header'>KULLANICI LİSTESİ</h2>
            <p className='description'>Kayıtlı kullanıcıların listesi</p>
            <div className='list'>
                <div className='list-header'>
                    <div className='user-column'>Kullanıcı</div>
                    <div className='status-column'>Yetki</div>
                    <div className='gender-column'>Cinsiyet</div>
                    <div className='contact-column'>İletişim</div>
                    <div className='actions-column'>Hareketler</div>
                </div>
                {props.users.map((user,userKey)=>{
                    return(
                        <div className="list-item" key={userKey}>
                            <div className='list-column user-column'>
                                <img src={user.profile} alt=""/>
                                <span className="name-surname">{user.name} {user.surname}</span>
                            </div>
                            <div className='list-column status-column'>
                                {user.position.toLocaleLowerCase() === "kullanıcı" ? <div className='status-color user-color'></div> : <div className='status-color admin-color'></div>}{user.position}
                            </div>
                            <div className='list-column gender-column'>
                                {user.gender}
                            </div>
                            <div className='list-column contact-column'>
                                <a href={`mailto:${user.email}`}>{user.email}</a>
                            </div>
                            <div className='list-column actions-column'>
                                <button className='actions-button'>Hareketler</button>
                                <div className='user-actions'>
                                    <button onClick={()=>{navigate(`/admin/user-list/${user.id}`)}}>Düzenle</button>
                                    <button onClick={()=>{removeUser(user.id)}}>Kaldır</button>
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

export default AdminUserList