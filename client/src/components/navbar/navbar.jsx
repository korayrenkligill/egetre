import '../../styles/navbar/pc-navbar.css'
import React, { useEffect, useState } from 'react'
import Logo from '../../images/logo/Logo.png'
import {NavLink,Link, useNavigate} from 'react-router-dom'
import { BsBarChartFill,BsFillSunFill,BsFillMoonFill,BsFillDoorOpenFill,BsTicketPerforatedFill,BsHouseDoor,BsHouseDoorFill,BsGeoAlt,BsGeoAltFill,BsInfoCircle,BsInfoCircleFill,BsPerson,BsPersonFill } from "react-icons/bs";
import SeatConverter from '../seat-converter';

function Navbar(props){
    const navigate = useNavigate();

    const[ticketDetail,setTicketDetail] = useState("absolute-none");
    const[profileDetail,setProfileDetail] = useState("absolute-none");
    const[allCloseButton,setAllCloseButton] = useState("all-detail-close-none");

    const ticketDetailOpen = ()=>{
        setTicketDetail("absolute");
        setAllCloseButton("all-detail-close");
    }
    const profileDetailOpen = ()=>{
        setProfileDetail("absolute");
        setAllCloseButton("all-detail-close");
    }
    const allDetailClose = ()=>{
        setTicketDetail("absolute-none");
        setProfileDetail("absolute-none");
        setAllCloseButton("all-detail-close-none");
    }

    const [width, setWidth]   = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const handleLogout = ()=>{
        props.setLoggedUser(null);
        props.setIsLogged(false);
        localStorage.setItem('loggedUser', -1);
        navigate("/login-register");
        window.location.reload();
    }

    if(width > 768)
        return (
        <div className={props.theme ? 'pc-navbar light' : 'pc-navbar dark'}>
            <div className='left'>
                <Link to="/" className="logo">
                    <img src={Logo} alt="" />
                    <span className='company-name'>Egetre</span>
                </Link>
                <NavLink to="/" className="navlink"><span>Gösteriler</span></NavLink>
                <NavLink to="/salonumuz" className="navlink"><span>Salonumuz</span></NavLink>
                <NavLink to="/hakkımızda" className="navlink"><span>Hakkımızda</span></NavLink>
            </div>
            <div className="right">
                {
                    props.isLogged ?
                    <div className='logged'>
                        <div className='my-tickets' onClick={ticketDetailOpen}>
                            <BsTicketPerforatedFill/>
                            <div className={ticketDetail}>
                                {props.user.ticket && JSON.parse(props.user.ticket).map((ticket,key)=>{
                                    var theatre = props.theatres.filter(e => e.id === Number(ticket.theatreId));
                                    if(theatre.length > 0){
                                        return(
                                            <div className='ticket' key={key}>
                                                <div>
                                                    <h2 className='ticket-name'>{theatre[0].name}</h2>
                                                    <p className='ticket-kn'>KN: {SeatConverter(ticket.seatId)}</p>
                                                </div>
                                                <div>
                                                    <p className='ticket-date'>{ticket.seatDate}, {ticket.seatTime}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                                {!props.user.ticket &&
                                    <div className='ticket'>
                                        <div>
                                            <h2 className='ticket-name'>Herhangi bir biletiniz bulunmamakta</h2>
                                            <p className='ticket-kn'></p>
                                        </div>
                                        <div>
                                            <p className='ticket-date'></p>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='profile' onClick={profileDetailOpen}>
                            <img src={props.user.profile} alt="" />
                            <div className={profileDetail}>
                                <button onClick={()=>{navigate("/profil")}}><BsPersonFill className='profile-detail-icon'/>Profile</button>
                                {props.user.position.toLocaleLowerCase() === "admin" && <button onClick={()=>{navigate("/admin")}}><BsBarChartFill className='profile-detail-icon'/>Yönetim Paneli</button>}
                                <button onClick={()=>{props.setTheme(!props.theme)}}>{!props.theme ? <BsFillSunFill className='profile-detail-icon'/> : <BsFillMoonFill className='profile-detail-icon'/>}Tema Değiştir</button>
                                <button onClick={handleLogout} ><BsFillDoorOpenFill className='profile-detail-icon'/>Çıkış yap</button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='not-logged'>
                        <button onClick={()=>{props.setTheme(!props.theme)}}>{!props.theme ? <BsFillSunFill className='profile-detail-icon'/> : <BsFillMoonFill className='profile-detail-icon'/>}</button>
                        <Link to="/login-register" className='link login'>Giriş Yap</Link>
                        <Link to="/login-register" className='link register'>Ücretsiz Kayıt Ol</Link>
                    </div>
                }
            </div>
            <button className={allCloseButton} onClick={allDetailClose}></button>
        </div>
        )
    else
        return(
        <div className={props.theme ? 'mobile-navbar light' : 'mobile-navbar dark'}>
            <NavLink to="/" className="link"><BsHouseDoor className='not-fill'/><BsHouseDoorFill className='fill'/><span>Gösteriler</span></NavLink>
            <NavLink to="/salonumuz" className="link"><BsGeoAlt className='not-fill'/><BsGeoAltFill className='fill'/><span>Salonumuz</span></NavLink>
            <NavLink to="/hakkımızda" className="link"><BsInfoCircle className='not-fill'/><BsInfoCircleFill className='fill'/><span>Hakkımızda</span></NavLink>
            <button onClick={()=>{props.setTheme(!props.theme)}} className='link'>{!props.theme ? <BsFillSunFill className='profile-detail-icon'/> : <BsFillMoonFill className='profile-detail-icon'/>}</button>
            <NavLink to={props.isLogged ? "/profil" : "/login-register"} className="link">{props.isLogged ? <div className='frame'><img src={props.user.profile}/></div> : <div><BsPerson className='not-fill'/><BsPersonFill className='fill'/><span>Profil</span></div>}</NavLink>
        </div>
        )
}

export default Navbar