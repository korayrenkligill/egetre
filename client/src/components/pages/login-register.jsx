import React, { useEffect, useState } from "react";
import loginImage from "../../images/login-page-4468581-3783954.png";
import "../../styles/pages/login-register.css";
import axios from "axios";
import defaultManProfile from "../defaultManProfile";
import defaultWomenProfile from "../defaultWomenProfile";
import { useNavigate } from "react-router-dom";

function LoginRegister(props) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [gender, setGender] = useState("erkek");
  const [profile, setProfile] = useState(defaultManProfile);

  const [error, setError] = useState("");

  const [transform, setTransform] = useState(0);
  const backgroudItem = {
    transform: `translateX(${transform}px)`,
  };

  const handleGenderChanged = (e) => {
    if (e.target.value == "kadın") {
      setProfile(defaultWomenProfile);
      setGender(e.target.value);
    } else {
      setProfile(defaultManProfile);
      setGender(e.target.value);
    }
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();

    const user = {
      username: username,
      password: password,
      email: email,
      name: name,
      surname: surname,
      position: "Kullanıcı",
      gender: gender,
      profile: profile,
    };

    if (
      !props.users.some(
        (user) => user.username === username || user.email === email
      )
    ) {
      axios
        .post("http://localhost:3001/user/add", user)
        .then((response) => {
          console.log(response.data);
        })
        .then(() => {
          navigate("/login-register");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setError("Bu bilgilerde bir kullanıcı bulunmakta");
    }
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (
      props.users.some(
        (user) => user.username === username && user.password === password
      )
    )
      for (var i = 0; i < props.users.length; i++) {
        if (
          props.users[i].username === username &&
          props.users[i].password === password
        ) {
          props.setLoggedUser(props.users[i]);
          props.setIsLogged(true);
          localStorage.setItem("loggedUser", props.users[i].id);
          navigate("/");
        }
      }
    else {
      setError("Kullanıcı bulunamadı");
    }
  };
  return (
    <div
      className={props.theme ? "login-register light" : "login-register dark"}
    >
      <div className="frame">
        <img src={loginImage} alt="" />
      </div>
      <div className="login-or-register">
        <form
          onSubmit={handleLoginSubmit}
          action=""
          className="login"
          style={backgroudItem}
        >
          <h2>Giriş Yap</h2>
          <input
            type="text"
            placeholder="kullanıcı adı.."
            autoComplete="username"
            id="login-username"
            minLength="4"
            maxLength="29"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="şifre.."
            autoComplete="current-password"
            id="login-password"
            minLength="4"
            maxLength="29"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div>
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me"> Hesabımı hatırla</label>
          </div>
          {error.length > 0 ? (
            <p className="error-message">{error}</p>
          ) : username.length < 1 ? (
            <p className="error-message">Kullanıcı adı girmelisin !</p>
          ) : password.length < 1 ? (
            <p className="error-message">Şifre girmelisin !</p>
          ) : (
            <span></span>
          )}
          <button
            type="submit"
            disabled={username.length < 1 || password.length < 1}
          >
            Giriş yap
          </button>
          <p
            onClick={() => {
              setTransform(-263);
            }}
          >
            hesap oluştur
          </p>
        </form>
        <form
          onSubmit={handleRegisterSubmit}
          action=""
          className="register"
          style={backgroudItem}
        >
          <h2>Kayıt Ol</h2>
          <input
            type="text"
            placeholder="kullanıcı adı.."
            autoComplete="username"
            id="register-username"
            minLength="4"
            maxLength="29"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <div>
            <input
              type="text"
              placeholder="isim.."
              minLength="4"
              maxLength="14"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="soyisim.."
              minLength="4"
              maxLength="14"
              value={surname}
              onChange={(e) => {
                setSurname(e.target.value);
              }}
            />
          </div>
          <input
            type="email"
            placeholder="e-posta.."
            autoComplete="email"
            id="register-email"
            minLength="4"
            maxLength="49"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="şifre.."
            id="register-password"
            autoComplete="current-password"
            minLength="4"
            maxLength="29"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="şifre.."
            id="register-password2"
            autoComplete="current-password"
            minLength="4"
            maxLength="29"
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
          />
          <div className="gender">
            <div>
              <input
                type="radio"
                name="gender"
                id="man"
                defaultChecked
                value="erkek"
                onChange={handleGenderChanged}
              />
              <label htmlFor="man">Erkek</label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                id="women"
                value="kadın"
                onChange={handleGenderChanged}
              />
              <label htmlFor="women">Kadın</label>
            </div>
          </div>
          {error.length > 0 ? (
            <p className="error-message">{error}</p>
          ) : username.length < 1 ? (
            <p className="error-message">Kullanıcı adı boş bırakılamaz!</p>
          ) : password.length < 1 ? (
            <p className="error-message">Şifre boş bırakılamaz!</p>
          ) : name.length < 1 ? (
            <p className="error-message">İsim boş bırakılamaz!</p>
          ) : surname.length < 1 ? (
            <p className="error-message">Soyisim boş bırakılamaz!</p>
          ) : email.length < 1 ? (
            <p className="error-message">E-posta boş bırakılamaz!</p>
          ) : password2.length < 1 ? (
            <p className="error-message">Şifre tekrar boş bırakılamaz!</p>
          ) : password !== password2 ? (
            <p className="error-message">Şifreler aynı değil!</p>
          ) : (
            <span></span>
          )}
          <button
            type="submit"
            disabled={
              username.length < 1 ||
              password.length < 1 ||
              name.length < 1 ||
              surname.length < 1 ||
              email.length < 1 ||
              password2.length < 1 ||
              password !== password2
            }
          >
            Kayıt ol
          </button>
          <p
            onClick={() => {
              setTransform(0);
            }}
          >
            hesabım var
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginRegister;
