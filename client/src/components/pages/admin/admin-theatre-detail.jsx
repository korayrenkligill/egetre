import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from './admin-sidebar';
import '../../../styles/pages/admin/admin-main.css'
import '../../../styles/pages/admin/admin-theatre-detail.css'
import { BsFileEarmarkPlus,BsPlus } from "react-icons/bs";
import axios from 'axios';

function AdminTheatreDetail(props) {
    let { id } = useParams();
    const navigate = useNavigate();
    const theatreArray = props.theatres.filter(e => e.id === Number(id));; 
    const theatre = theatreArray[0];

    const date = new Date();
    let nowDate;
    if(date.getMonth() > 8 && date.getDate() > 8)
        nowDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    else if((date.getMonth()) > 8 && date.getDate() < 10)
        nowDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-0" + date.getDate();
    else if((date.getMonth()) < 10 && date.getDate() > 8)
        nowDate = date.getFullYear() + "-0" + (date.getMonth()+1) + "-" + date.getDate();
    else
        nowDate = date.getFullYear() + "-0" + (date.getMonth()+1) + "-0" + date.getDate();
    
    const [errorMessage,setErrorMessage] = useState("");
    const [errorMessageStatus,setErrorMessageStatus] = useState(false);
    
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [trailer, setTrailer] = useState('');
    const [price, setPrice] = useState(0);
    const [cast, setCast] = useState([]);
    const [time, setTime] = useState(0);
    const [categories, setCategories] = useState([]);
    
    const [choosedDate,setChoosedDate] = useState(nowDate);
    const [choosedHour,setChoosedHour] = useState(0);
    const [choosedMinute,setChoosedMinute] = useState(0);
    const [sessionList,setSessionList] = useState([]);
    
    let nowSession = {
        date: "",
        time: "",
        seats: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = ()=>{
          setImage(reader.result.toString());
        }
        reader.readAsDataURL(file);
      };
    
    function addSession(){
        nowSession.date = choosedDate;
        
        if(choosedHour < 10 && choosedMinute < 10){
            nowSession.time = "0" + choosedHour + ":" + "0" +choosedMinute;
        }
        else if(choosedHour < 10 && choosedMinute > 9){
            nowSession.time = "0" + choosedHour + ":" + choosedMinute;
        }
        else if(choosedHour > 9 && choosedMinute < 10){
            nowSession.time = choosedHour + ":" + "0" + choosedMinute;
        }
        else{
            nowSession.time = choosedHour + ":" + choosedMinute;
        }

        let isDuplicate = sessionList.some(e => e.date === nowSession.date && e.time === nowSession.time);
        if (isDuplicate) {
            setErrorMessageStatus(true);
            setErrorMessage("Bu tarihte bir seans bulunmakta!");
        } else {
            setSessionList(e => [...e,nowSession]);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const changedTheatre = {
          name: name,
          trailer: trailer,
          price: price,
          cast: JSON.stringify(cast),
          time: time,
          categories: JSON.stringify(categories),
          image: image,
          sessions: JSON.stringify(sessionList),
          theatreId: theatre.id,
        };
    
        axios.post('http://localhost:3001/admin/update/theatre', changedTheatre)
          .then(response => {
            console.log(response.data);
          })
          .then(()=>{navigate("/admin/theatre-list")})
          .then(()=>{window.location.reload()})
          .catch(error => {
            console.log(error);
          });
    };

    var innerSessionList = [];
    useEffect(()=>{
        const session = JSON.parse(theatre.sessions);
        for(var i = 0; i < session.length; i++){
            const x = {
                date: session[i].date,
                time: session[i].time,
                seats: session[i].seats
            }
            let isDuplicate = innerSessionList.some(e => e.date === x.date && e.time === x.time);
            if (!isDuplicate) {
                innerSessionList.push(x);
            }
        }
        setSessionList(innerSessionList);
        setImage(theatre.image);
        setName(theatre.name);
        setTrailer(theatre.trailer);
        setPrice(theatre.price);
        setCast(JSON.parse(theatre.cast));
        setTime(theatre.time);
        setCategories(JSON.parse(theatre.categories));
    }, []);
    return (
        <div className={props.theme ? 'admin admin-theatre-detail light' : 'admin admin-theatre-detail dark'}>
            <AdminSidebar theme={props.theme}/>
            <form onSubmit={handleSubmit} className="main">
            <h2 className='header'>TİYATRO DÜZENLE</h2>
            <p className='description'>Gösteri bilgilerini düzenle</p>
            <div className='theatre-add-form'>
                {image ?
                <label htmlFor='image' className='choosed-image'>
                <img src={image} alt="" />
                </label>:
                <label htmlFor='image' className='choose-image'>
                <BsFileEarmarkPlus/>
                <p>600x800</p>
                <span>tavsiye edilen boyut</span>
                </label>}
                <input type="file" id="image" accept="image/*"  onChange={e => handleFileChange(e)}/>
                {/* <div className='choosed-image'>
                <img src="" alt="" />
                </div> */}
                <input className='form-item theatre-name' type="text" placeholder='Tiyatro adını giriniz..'  minLength="1" maxLength="50" value={name} onChange={e => setName(e.target.value)}/>
                <textarea className='form-item theatre-description' type="text" rows="5"  placeholder='Tiyatro açıklaması giriniz..'  minLength="1" maxLength="200" value={trailer} onChange={e => setTrailer(e.target.value)}></textarea>
                <div className='number-input'>
                <label htmlFor="price">Fiyat:</label>
                <input className='theatre-price' id='price' type="number" min="0" placeholder='Tiyatro fiyatı giriniz..' value={price} onChange={e => setPrice(parseFloat(e.target.value))}/>
                </div>
                <input className='form-item theatre-name' type="text" placeholder='Oyuncu kadrosu.. (oyuncu1,oyuncu2..)'  minLength="1" maxLength="50" value={cast} onChange={e => setCast(e.target.value.split(','))}/>
                <div className='number-input'>
                <label htmlFor="time">Gösterim süresi:</label>
                <input className='theatre-price' id='time' type="number" min="0" placeholder='Gösteri süresi giriniz..' value={time} onChange={e => setTime(parseInt(e.target.value))}/>
                </div>
                <input className='form-item theatre-name' type="text" placeholder='Kategoriler... (dram,komedi..)'  minLength="1" maxLength="50" value={categories} onChange={e => setCategories(e.target.value.split(','))}/>
                <div className='choose-session-panel'>
                <input type="date" min={nowDate} value={choosedDate} onChange={(e)=>{setChoosedDate(e.target.value)}}/>
                <div>
                    <input type="number" min="00" max="23" value={choosedHour} onChange={(e)=>{setChoosedHour(e.target.value)}}/>
                    <span> : </span>
                    <input type="number" min="00" max="59" value={choosedMinute} onChange={(e)=>{setChoosedMinute(e.target.value)}}/>
                </div>
                <button type='button' className='add-session' onClick={()=>{addSession()}}>SEANS EKLE</button>
                </div>
                <p className={errorMessageStatus ? 'error-message' : "everything-ok"}>{errorMessage}</p>
                <div className='sessions'>
                <h2>Seanslar</h2>
                {sessionList.map((item,index)=>{return(
                    <p key={index}>Seans: {item.date} - {item.time}</p>
                )})}
                </div>
                {!image ? <p className='error-message'>Tiyatro resmi seçmelisin !</p> : name.length < 1 ? <p className='error-message'>Tiyatro adı çok kısa !</p> : trailer.length < 1 ? <p className='error-message'>Tiyatro açıklaması çok kısa !</p> : 
                cast.length < 1 || cast[0] == "" ? <p className='error-message'>En az bir oyuncu adı girmelisin !</p> : categories.length < 1  || categories[0] == "" ? <p className='error-message'>En az bir kategori girmelisin !</p> :
                sessionList.length < 1 ? <p className='error-message'>En az bir seans girmelisin !</p> : <span></span>}
                <button type="submit"  disabled={!image || name.length < 1 || trailer.length < 1 || cast.length < 1 || time < 10 || categories.length < 1 || sessionList.length < 1} className='add-theatre'>Tiyatroyu Güncelle</button>
                <div className='margin-bottom'></div>
            </div>
            </form>
        </div>
    )
}

export default AdminTheatreDetail