import React, { useEffect } from "react";
import "../../styles/pages/place.css";
import GaleryImage from "../galery-image";
function Place(props) {
  useEffect(() => {
    document.title = "Egetre : En ucuz tiyatro biletleri";
  }, []);
  return (
    <div className={props.theme ? "place light" : "place dark"}>
      <div className="header">
        <h2>Salonumuz</h2>
      </div>
      <h2 className="headertag">Salonumuzdan Görseller</h2>
      <div className="flex">
        <div className="column">
          <GaleryImage url={require("../../images/theatre/1.jpeg")} />
          <GaleryImage url={require("../../images/theatre/11.jpg")} />
          <GaleryImage url={require("../../images/theatre/6.jpg")} />
          <GaleryImage url={require("../../images/theatre/3.jpg")} />
        </div>
        <div className="column">
          <GaleryImage url={require("../../images/theatre/5.jpg")} />
          <GaleryImage url={require("../../images/theatre/7.jpg")} />
          <GaleryImage url={require("../../images/theatre/10.jpg")} />
          <GaleryImage url={require("../../images/theatre/8.jpg")} />
          <GaleryImage url={require("../../images/theatre/9.jpg")} />
        </div>
        <div className="column">
          <GaleryImage url={require("../../images/theatre/12.jpg")} />
          <GaleryImage url={require("../../images/theatre/4.jpg")} />
          <GaleryImage url={require("../../images/theatre/2.jpg")} />
          <GaleryImage url={require("../../images/theatre/13.jpg")} />
        </div>
      </div>
      <div className="address">
        <h2 className="headertag">Adresimiz</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d401.1018882932009!2d27.429012310039916!3d38.61515194723091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b99c6b9dde1f15%3A0x17105028f1061f19!2zRXJ0dcSfcnVsIERhecSxb8SfbHUgKEvDvGx0w7xyIFNpdGVzaSkgT3RvcGFya8Sx!5e0!3m2!1str!2str!4v1681680956796!5m2!1str!2str"
          style={{ border: "0" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <p className="address-text">
          Yarhasanlar, 1706. Sk., 45020 Manisa Merkez/Manisa
        </p>
      </div>
    </div>
  );
}

export default Place;
