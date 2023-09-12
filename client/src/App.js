import React, { useEffect, useState } from 'react'
import './app.css'
import Navbar from './components/navbar/navbar'
import { Route,Routes } from 'react-router-dom'
import MainPage from './components/pages/main-page'
import Company from './components/pages/company'
import Footer from './components/footer'
import ErrorPage from './components/pages/error404'
import Place from './components/pages/place'
import Profile from './components/pages/profile'
import AdminDashboard from './components/pages/admin/admin-dashboard'
import AdminUserList from './components/pages/admin/admin-userlist'
import AdminTheatreList from './components/pages/admin/admin-theatrelist'
import AdminTheatreAdd from './components/pages/admin/admin-theatreadd'
import TheatreDetails from './components/pages/theatre-details'
import axios from 'axios'
import LoginRegister from './components/pages/login-register'
import {ClipLoader,RotateLoader} from 'react-spinners'
import AdminUserDetail from './components/pages/admin/admin-user-detail'
import AdminTheatreDetail from './components/pages/admin/admin-theatre-detail'
function App() {
  const [theatres, setTheatres] = useState([]);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);

  const [loggedUser, setLoggedUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [localUserId, setLocalUserId] = useState(null);

  const [loading, setLoading] = useState(true);

  const [theme,setTheme] = useState(localStorage.getItem('theme') === "true");

  const changeTheme = (choosedTheme)=>{
    setTheme(choosedTheme);
    localStorage.setItem('theme',choosedTheme);
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

    useEffect(() => {
      
      axios
      .get("http://localhost:3001/theatres")
      .then((response) => {
        setTheatres(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      
      axios
      .get("http://localhost:3001/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      
      axios
      .get("http://localhost:3001/users")
      .then((response) => {
        setUsers(response.data);
      })
      .then(setLocalUser)
      .then(()=>{
        setTimeout(()=>{
          setLoading(false);
        },1000)
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);
    const setLocalUser = ()=>{
      if(users && localStorage.getItem('loggedUser'))
        setLocalUserId(localStorage.getItem('loggedUser'))
    }
    useEffect(() => {
      if(localUserId && localUserId >= 0){
        setIsLogged(true);
        setLoggedUser(users[localUserId-1]);
      }
    }, [localUserId]);
  return (
    <div className='app'>
      {
        loading ? 
        <div className='loading'>
          <RotateLoader
          color='#0099ff'
          loading={loading}
          // cssOverride={override}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
          />
        </div>
        :
        <div className={theme ? 'main-container light' : 'main-container dark'}>
          <div>
            <Navbar isLogged={isLogged} user={loggedUser} setIsLogged={setIsLogged} setLoggedUser={setLoggedUser} theatres={theatres} theme={theme} setTheme={changeTheme} />
            <Routes>
              <Route path='/' element={<MainPage theatres={theatres} theme={theme}/>}/>
              <Route path='/hakkımızda' element={<Company theme={theme}/>}/>
              <Route path='/salonumuz' element={<Place theme={theme}/>}/>
              {isLogged && <Route path='/profil' element={<Profile user={loggedUser} users={users} theatres={theatres} theme={theme} setIsLogged={setIsLogged} setLoggedUser={setLoggedUser}/>}/>}
              {width > 768 && isLogged && loggedUser.position.toLocaleLowerCase() === "admin" && <Route path='/admin' element={<AdminDashboard users={users} data={data} theme={theme}/>}/>}
              {width > 768 && isLogged && loggedUser.position.toLocaleLowerCase() === "admin" && <Route path='/admin/user-list' element={<AdminUserList users={users} theme={theme}/>}/>}
              {width > 768 && isLogged && loggedUser.position.toLocaleLowerCase() === "admin" && <Route path='/admin/user-list/:id' element={<AdminUserDetail users={users} theme={theme}/>}/>}
              {width > 768 && isLogged && loggedUser.position.toLocaleLowerCase() === "admin" && <Route path='/admin/theatre-list' element={<AdminTheatreList theatres={theatres} theme={theme}/>}/>}
              {width > 768 && isLogged && loggedUser.position.toLocaleLowerCase() === "admin" && <Route path='/admin/theatre-list/:id' element={<AdminTheatreDetail theatres={theatres} theme={theme}/>}/>}
              {width > 768 && isLogged && loggedUser.position.toLocaleLowerCase() === "admin" && <Route path='/admin/theatre-add' element={<AdminTheatreAdd theme={theme}/>}/>}
              <Route path='/theatre/detail/:id' element={<TheatreDetails theatres={theatres} user={loggedUser} setUser={setLoggedUser} theme={theme}/>}/>
              {!isLogged && <Route path='/login-register' element={<LoginRegister users={users} isLogged={isLogged} setIsLogged={setIsLogged} setLoggedUser={setLoggedUser} theme={theme}/>}/>}
              <Route path='/*' element={<ErrorPage theme={theme}/>}/>
            </Routes>
          </div>
          <Footer theme={theme}/>
        </div>
      }
    </div>
  )
}

export default App