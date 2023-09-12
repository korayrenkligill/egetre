import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from './admin-sidebar'
import '../../../styles/pages/admin/admin-main.css'
import '../../../styles/pages/admin/admin-user-detail.css'
import axios from 'axios';

function AdminUserDetail(props) {
    let { id } = useParams();
    const navigate = useNavigate();
    const userArray = props.users.filter(e => e.id === Number(id));; 
    const user = userArray[0];

    const [unapprovedImage,setUnapprovedImage] = useState(null)
    const [unapprovedName,setUnapprovedName] = useState("");
    const [unapprovedSurname,setUnapprovedSurname] = useState("");
    const [unapprovedPosition,setUnapprovedPosition] = useState("");
    const [unapprovedEmail,setUnapprovedEmail] = useState("");
    const [unapprovedUsername,setUnapprovedUsername] = useState("");
    const [unapprovedPassword,setUnapprovedPassword] = useState("");
    const [unapprovedPassword2,setUnapprovedPassword2] = useState("");

    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [passwordInputType, setPasswordInputType] = useState("password");
    
    const changePasswordVisibility = ()=>{
        if(!passwordVisibility){
            setPasswordInputType("text");
            setPasswordVisibility(true);
        }
        else{
            setPasswordInputType("password");
            setPasswordVisibility(false);
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = ()=>{
            setUnapprovedImage(reader.result.toString());
        }
        reader.readAsDataURL(file);
    };

    const handleSubmit = (event) => {
        if(unapprovedPassword === unapprovedPassword2){
            event.preventDefault();
            const changedUser = {
              username: unapprovedUsername,
              password: unapprovedPassword,
              email: unapprovedEmail,
              name: unapprovedName,
              surname: unapprovedSurname,
              position: unapprovedPosition,
              profile: unapprovedImage,
              userId: user.id,
            };
        
            axios.post('http://localhost:3001/admin/update/user', changedUser)
              .then(response => {
                console.log(response.data);
              })
              .then(()=>{navigate("/admin/user-list")})
              .then(()=>{window.location.reload()})
              .catch(error => {
                console.log(error);
              });
        }
    };

    useEffect(()=>{
        setUnapprovedImage(user.profile);
        setUnapprovedName(user.name);
        setUnapprovedSurname(user.surname);
        setUnapprovedPosition(user.position);
        setUnapprovedEmail(user.email);
        setUnapprovedUsername(user.username);
        setUnapprovedPassword(user.password);
        setUnapprovedPassword2(user.password);
    }, []);

    return (
        <div className={props.theme ? 'admin admin-user-detail light' : 'admin admin-user-detail dark'}>
            <AdminSidebar theme={props.theme}/>
            <div className='main'>
                <h2 className='header' onClick={()=>{console.log(unapprovedPosition)}}>KULLANICI DÜZENLE</h2>
                <p className='description' onClick={()=>{console.log(user)}}>Kayıtlı kullanıcı bilgilerini düzenle</p>
                <form onSubmit={handleSubmit} className='edit'>
                    <div className='profile'>
                        <img src={unapprovedImage} alt="" />
                        <input id='file' type="file" accept="image/*"  onChange={e => handleFileChange(e)}/>
                        <label htmlFor='file'>profil resmini güncelle</label>
                    </div>
                    <div className='texts'>
                        <div>
                            <input className='name' type="text" placeholder='isim..' value={unapprovedName} onChange={(e)=>{setUnapprovedName(e.target.value)}}/>
                            <input className='surname' type="text" placeholder='soyisim..' value={unapprovedSurname} onChange={(e)=>{setUnapprovedSurname(e.target.value)}}/>
                        </div>
                        <input className='email' type="email" placeholder='email..' value={unapprovedEmail} onChange={(e)=>{setUnapprovedEmail(e.target.value)}}/>
                        <div className='position'>
                            <div>
                                <input type="radio" name="position" id="user" value="Kullanıcı" defaultChecked={user.position.toLocaleLowerCase() == "kullanıcı" && true} onChange={(e)=>{setUnapprovedPosition(e.target.value)}}/><label htmlFor="user">Kullanıcı</label>
                            </div>
                            <div>
                                <input type="radio" name="position" id="admin" value="Admin" defaultChecked={user.position.toLocaleLowerCase() == "admin" && true} onChange={(e)=>{setUnapprovedPosition(e.target.value)}}/><label htmlFor="admin">Admin</label>
                            </div>
                        </div>
                        <input className='username' type="text" placeholder='username..' value={unapprovedUsername} onChange={(e)=>{setUnapprovedUsername(e.target.value)}}/>
                        <div className='passwords'>
                            <div>
                                <input className='password' type={passwordInputType} placeholder='password..' value={unapprovedPassword} onChange={(e)=>{setUnapprovedPassword(e.target.value)}}/>
                                <input className='password2' type={passwordInputType} placeholder='password..' value={unapprovedPassword2} onChange={(e)=>{setUnapprovedPassword2(e.target.value)}}/>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="show-hide-password" onChange={()=>{changePasswordVisibility(passwordVisibility)}}/><label htmlFor="show-hide-password">Şifreyi göster</label>
                            </div>
                        </div>
                        {!unapprovedImage ? <p className='error-message'>Bir resim seçmelisin !</p> : unapprovedName.length < 1 ? <p className='error-message'>İsim girmelisin !</p> : unapprovedSurname.length < 1 ? <p className='error-message'>Soyisim girmelisin !</p> : unapprovedUsername.length < 1 ? <p className='error-message'>Kullanıcı adı girmelisin !</p> : unapprovedPassword.length < 1 ? <p className='error-message'>Şifre girmelisin !</p> : unapprovedPassword2.length<1 ? <p className='error-message'>Şifre tekrar kısmı boş bırakılamaz !</p> : unapprovedPassword !== unapprovedPassword2 ? <p className='error-message'>Girilen şifreler farklı !</p> : <span></span>}
                        <button type='submit' disabled={!unapprovedImage || unapprovedName.length < 1 || unapprovedSurname.length < 1 || unapprovedEmail.length < 1 || unapprovedUsername.length < 1 || unapprovedPassword.length < 1 || unapprovedPassword2.length < 1 || unapprovedPassword !== unapprovedPassword2}>Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminUserDetail