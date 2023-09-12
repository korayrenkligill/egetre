import React, { useEffect } from "react";
import "../../styles/pages/profile.css";
import ProfileSettings from "../profile-settings";
import SeatConverter from "../seat-converter";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function dateControl(ticketDate) {
  const date = new Date();
  const ticketDateArray = ticketDate.split("-");

  if (Number(ticketDateArray[1]) > date.getMonth() + 1) {
    return true;
  } else if (Number(ticketDateArray[1]) === date.getMonth() + 1) {
    if (Number(ticketDateArray[2]) >= date.getDate()) {
      return true;
    } else {
      console.log("buradasın");
      return false;
    }
  } else {
    return false;
  }
}
function Profile(props) {
  useEffect(() => {
    document.title = "Egetre : En ucuz tiyatro biletleri";
  }, []);
  return (
    <div className={props.theme ? "profile light" : "profile dark"}>
      <ProfileSettings
        user={props.user}
        setIsLogged={props.setIsLogged}
        setLoggedUser={props.setLoggedUser}
      />
      <div className="tickets">
        {props.user.ticket &&
          JSON.parse(props.user.ticket).map((ticket, key) => {
            var theatre = props.theatres.filter(
              (e) => e.id === Number(ticket.theatreId)
            );
            if (theatre.length > 0) {
              return (
                <div className="ticket" key={key}>
                  <div className="left">
                    <div
                      className={
                        dateControl(ticket.seatDate)
                          ? "ticket-state-usable"
                          : "ticket-state-past"
                      }
                    ></div>
                    <div className="ticket-texts">
                      <h2>{props.theatres[ticket.theatreId - 1].name}</h2>
                      <p>
                        {ticket.seatDate}, {ticket.seatTime}
                      </p>
                      {/* {dateControl(ticket.seatDate) ? <button>iade et</button> : <button>Bileti sil</button>} */}
                    </div>
                  </div>
                  <div className="koltuk-numarasi">
                    <p>KN: {SeatConverter(ticket.seatId)}</p>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

export default Profile;
