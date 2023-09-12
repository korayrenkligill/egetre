import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { BsClockHistory,BsFillPersonLinesFill,BsFillGridFill } from "react-icons/bs";
import { MdEventSeat,MdOutlineEventSeat } from "react-icons/md";
import '../../styles/pages/theatre-detail.css'
import SeatConverter from '../seat-converter';

function TheatreDetails(props) {
    const navigate = useNavigate();
    let { id } = useParams();
    const divRef = useRef(null);
    const [height, setHeight] = useState(0);
    const [selectedSession, setSelectedSession] = useState(0);

    const [seats, setSeats] = useState([]);

    var theatre = props.theatres.filter(e => e.id === Number(id));

    const seatSelect = (theatreId, seatId, seatDate, seatTime)=>{
        const object = {
            theatreId: theatreId,
            seatId: seatId,
            seatDate: seatDate,
            seatTime: seatTime
        }
        if(seats.some(seat => seat.theatreId === theatreId && seat.seatId === seatId && seat.seatDate === seatDate && seat.seatTime === seatTime)){
            console.log(seatId);
            const newArray = seats.filter(function(seat) {
                return seat.seatId !== seatId;
            });
            setSeats(newArray);
        }
        else{
            setSeats(oldArray => [...oldArray, object]);
        }
    }

    const ticketSubmit = () => {
        if(seats.length > 0){
            console.log(props.user.ticket ? JSON.parse(props.user.ticket) : "ticket yok");
            let tickets;
            if(!props.user.ticket){
                //bileti yok
                tickets = seats;
            }
            else{
                //bileti var
                tickets = JSON.parse(props.user.ticket).concat(seats);
            }
            const userId = props.user.id;
            const newValue = JSON.stringify(tickets);
    
    
    
            var theatreSeats = JSON.parse(theatre[0].sessions);
            for(var i = 0; i<seats.length; i++){
                theatreSeats[selectedSession].seats[seats[i].seatId] = 1;
            }
    
            var jsonTheatre = JSON.stringify(theatreSeats);
    
            axios.post('http://localhost:3001/update/tickets', { userId, newValue})
            .then((res) => {
            console.log(res.data);
            })
            .catch((err) => {
            console.error(err);
            });
            
            for(var i = 0; i<seats.length; i++){
                var price = theatre[0].price;
                axios.post('http://localhost:3001/data/add', {price})
                .then((res) => {
                console.log(res.data);
                })
                .catch((err) => {
                console.error(err);
                });
            }

            axios.post('http://localhost:3001/update/sessions', { id, jsonTheatre})
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
    };

    // const [theatres, setTheatres] = useState(null);
    useEffect(() => {
    //   axios
    //     .get("http://localhost:3001/theatres")
    //     .then((response) => {
    //       setTheatres(response.data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
        if (divRef.current) {
            setHeight(divRef.current.offsetHeight-50 + "px");
        }
    }, []);
    if(theatre)
    return (
    <div className={props.theme ? 'detail-page light' : 'detail-page dark'}>
        <div className='background-color'>
            <div ref={divRef} className='details'>
                <div className='frame'>
                    <img src={theatre[0].image} alt="" />
                </div>
                <div className='right'>
                    <div className='first-row'>
                        <div className='header'>
                            <h1>{theatre[0].name.toLocaleUpperCase()}</h1>
                            <p><BsClockHistory className='icon'/> {theatre[0].time}dk</p>
                        </div>
                        <h2>{theatre[0].price}₺</h2>
                    </div>
                    <p className='trailer'>
                        {theatre[0].trailer}
                    </p>
                    <p className='cast'>
                        <BsFillPersonLinesFill className='icon'/> Oyuncu Kadrosu:{" "}
                        {JSON.parse(theatre[0].cast).map((castItem,castKey)=>{return(
                            <span key={castKey} className='cast-span'>
                                {castItem}
                                {castKey === JSON.parse(theatre[0].cast).length - 1 ? "" : ", "}
                                {" "}
                            </span>
                        )})}
                    </p>
                    <p className='categories'>
                        <BsFillGridFill className='icon'/> Kategoriler: {" "}
                        {JSON.parse(theatre[0].categories).map((category,categoryKey)=>{return(
                            <span key={categoryKey} className='category-span'>
                                {category}
                                {categoryKey === JSON.parse(theatre[0].categories).length - 1 ? "" : ", "}
                                {" "}
                            </span>
                        )})}
                    </p>
                </div>
            </div>
        </div>
        <div className='rules'>
            <h2>Etkinlik Kuralları</h2>
            <ul>
                <li>Gününde ve saatinde kullanılmayan biletler geçersiz olup, bilet bedeli ve hizmet bedeli iadesi ve/ veya değişiklik yapılması mümkün değildir. Gün ve saatinde kullanılmayan biletlerin iadesi için iade talebinde bulunulamaz.</li>
                <li>Biletiniz mücbir sebep ya da etkinliğin iptali haricinde herhangi bir sebeple kullanılamayacak ise, en geç etkinlik saatinden 1 saat önceye kadar, Egetre ile irtibata geçmenizi rica ederiz, aksi takdirde biletinizin iptal işlemi gerçekleştirilememektedir.</li>
                <li>Organizasyon sahibi kurum ve/veya kuruluşlar gösteri verilecek alanlarda ve/veya gösteri salonlarında oturum düzeni ve planında uygun gördüğü durumlarda yer değişikliği yapma hakkına sahiptir.</li>
                <li>Etkinliğe ait indirimli bilet tanımı olması ve indirimli bilet seçeneği ile bilet satın alınması durumunda Kullanıcı bu indirimli bilete tabi olduğu kabul ve tahaahüt eder. İndirimli biletler için satın alınan biletin etkinlik mekanında kimlik ibrazı zorunlu olacaktır.</li>
                <li>Etkinlik saatine geç kalınması durumunda Egetre kullanıcının etkinlik mekanına alınması konusunda hiçbir şekilde sorumlu değildir.</li>
            </ul>
        </div>
        {props.user ?
            <div className='sessions'>
                <div className='sessions-date'>
                    {JSON.parse(theatre[0].sessions).map((session,sessionsKey)=>{return(
                        <button className={selectedSession === sessionsKey ? "selected" : ""} key={sessionsKey} onClick={()=>{setSelectedSession(sessionsKey)}}>
                            {session.date} / {session.time}
                        </button>
                    )})}
                </div>
                <div className='seats'>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
                    {JSON.parse(theatre[0].sessions)[selectedSession].seats.map((seat,seatKey)=>{return(
                        <div key={seatKey} className={(seatKey+1)%5 === 0 && (seatKey+1)%10 !== 0 ? "seat-margin seat" : seatKey === 0 ? "seat seat-d" : seatKey === 10 ? "seat seat-c" : seatKey === 20 ? "seat seat-b" : seatKey === 30 ? "seat seat-a" :  "seat"} onClick={()=>{seat === 0 && seatSelect(id,seatKey,JSON.parse(theatre[0].sessions)[selectedSession].date,JSON.parse(theatre[0].sessions)[selectedSession].time)}}>
                            { seats.some(seat => seat.seatId === seatKey) ? <MdEventSeat className='selected-seat'/> : seat === 0 ? <MdOutlineEventSeat className='empty-seat'/> : <MdEventSeat className='sold-seat'/>}
                        </div>
                    )})}
                </div>
                {seats.length > 0 && 
                    <div className='selected-seats-list'>
                        <p>Seçilen koltuklar</p>
                        <div className='list'>
                            {seats.map((seat,seatKey)=>{
                                return(
                                    <span key={seatKey}>{SeatConverter(seat.seatId)}</span>
                                )
                            })}
                        </div>
                    </div>
                }
                <div className='buy-tickets'>
                    {seats.length > 0 ?
                        <button onClick={ticketSubmit}>{theatre[0].price * seats.length}₺'ye Satın Al</button>
                        :
                        <button onClick={ticketSubmit}>Satın Al</button>
                    }
                </div>
            </div> :
            <div className='please-login' onClick={()=>{navigate("/login-register")}}>
                <p>Bilet almak için bir hesaba ihtiyacın var!</p>
                <span>tıkla ve ücretsiz olarak bize katıl</span>
            </div>
        }
    </div>
    )
}

export default TheatreDetails