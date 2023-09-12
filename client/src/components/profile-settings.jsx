import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsPencilSquare,BsXLg,BsCheck2,BsFillPersonVcardFill } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { useNavigate } from 'react-router-dom';


function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function ProfileSettings(props) {
    const navigate = useNavigate();
    const [settings,setSettings] = useState(false);
    
    const [unapprovedImage,setUnapprovedImage] = useState(null)
    const [unapprovedName,setUnapprovedName] = useState("");
    const [unapprovedSurname,setUnapprovedSurname] = useState("");
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
            const user = {
              username: unapprovedUsername,
              password: unapprovedPassword,
              email: unapprovedEmail,
              name: unapprovedName,
              surname: unapprovedSurname,
              profile: unapprovedImage,
              userId: props.user.id,
            };
        
            axios.post('http://localhost:3001/update/user', user)
              .then(response => {
                console.log(response.data);
              })
              .then(()=> {setSettings(false);})
              .then(()=>{window.location.reload()})
              .catch(error => {
                console.log(error);
              });
        }
    };
    const handleLogout = ()=>{
        props.setLoggedUser(null);
        props.setIsLogged(false);
        localStorage.setItem('loggedUser', -1);
        navigate("/login-register");
        window.location.reload();
    }
    
    useEffect(()=>{
        setUnapprovedImage(props.user.profile);
        setUnapprovedName(props.user.name);
        setUnapprovedSurname(props.user.surname);
        setUnapprovedEmail(props.user.email);
        setUnapprovedUsername(props.user.username);
        setUnapprovedPassword(props.user.password);
        setUnapprovedPassword2(props.user.password);
    },[])
    if(!settings)
        return (
        <div className='profile-notchange'>
            <div className='profile-frame'>
                <img src={props.user.profile} alt="profile photo" />
            </div>
            <div className='texts'>
                <h2>{capitalize(props.user.name)} {capitalize(props.user.surname)}</h2>
                {/* <p>{dateDay}/{dateMonth}/{dateYear}</p> */}
                <p><span><SiGmail className='icon'/> e-mail:</span> {props.user.email}</p>
                <p><span><BsFillPersonVcardFill className='icon'/> kullanıcı adı:</span> {props.user.username}</p>
                <p className='logout' onClick={handleLogout}>Çıkış yap</p>
            </div>
            <div className='buttons'>
                <button onClick={()=>{setSettings(true)}}><BsPencilSquare className='profile-edit-icon'/></button>
            </div>
        </div>
        )
    else
        return(
        <form onSubmit={handleSubmit} className='profile-change'>
            <div className='profile-frame'>
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
            </div>
            <div className="buttons">
                <button type='submit'><BsCheck2 className='profile-edit-icon'/></button>
                <button type='button' onClick={()=>{setSettings(false)}}><BsXLg className='profile-edit-icon'/></button>
            </div>
        </form>
        )
}

export default ProfileSettings