import React, { useEffect, useState } from "react";
import Filter from "../filter";
import "../../styles/pages/main-page.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MainPage(props) {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  var priceSplit;
  if (
    selectedPrice != "ücretsiz" &&
    selectedPrice != "" &&
    selectedPrice != "80₺ ve üzeri"
  )
    priceSplit = selectedPrice
      .replace("₺", "")
      .replace("₺", "")
      .replace(" ", "")
      .replace(" ", "")
      .split("-");
  else if (selectedPrice == "80₺ ve üzeri") priceSplit = 80;
  else if (selectedPrice == "ücretsiz") priceSplit = 0;
  else priceSplit = -1;

  const filteredTheatres = [];
  const theatreIds = [];
  const splitDate = selectedDate.split("/");
  props.theatres.forEach((theatre) => {
    const session = JSON.parse(theatre.sessions);
    const categories = JSON.parse(theatre.categories);
    if (selectedCategory == "") {
      if (priceSplit === -1) {
        session.forEach((sessionItem) => {
          var splitSession = sessionItem.date.split("-");
          if (selectedDate != "") {
            if (Number(splitSession[1]) == Number(splitDate[1])) {
              if (Number(splitSession[2]) >= Number(splitDate[0])) {
                if (!theatreIds.includes(theatre.id)) {
                  filteredTheatres.push(theatre);
                  theatreIds.push(theatre.id);
                }
              }
            } else if (Number(splitSession[1]) > Number(splitDate[1])) {
              if (!theatreIds.includes(theatre.id)) {
                filteredTheatres.push(theatre);
                theatreIds.push(theatre.id);
              }
            }
          } else {
            if (!theatreIds.includes(theatre.id)) {
              filteredTheatres.push(theatre);
              theatreIds.push(theatre.id);
            }
          }
        });
      } else if (
        priceSplit != 0 &&
        priceSplit != 80 &&
        priceSplit != -1 &&
        priceSplit[0] <= theatre.price &&
        priceSplit[1] >= theatre.price
      ) {
        session.forEach((sessionItem) => {
          var splitSession = sessionItem.date.split("-");
          if (selectedDate != "") {
            if (Number(splitSession[1]) == Number(splitDate[1])) {
              if (Number(splitSession[2]) >= Number(splitDate[0])) {
                if (!theatreIds.includes(theatre.id)) {
                  filteredTheatres.push(theatre);
                  theatreIds.push(theatre.id);
                }
              }
            } else if (Number(splitSession[1]) > Number(splitDate[1])) {
              if (!theatreIds.includes(theatre.id)) {
                filteredTheatres.push(theatre);
                theatreIds.push(theatre.id);
              }
            }
          } else {
            if (!theatreIds.includes(theatre.id)) {
              filteredTheatres.push(theatre);
              theatreIds.push(theatre.id);
            }
          }
        });
      } else if (priceSplit === 0 && theatre.price == 0) {
        session.forEach((sessionItem) => {
          var splitSession = sessionItem.date.split("-");
          if (selectedDate != "") {
            if (Number(splitSession[1]) == Number(splitDate[1])) {
              if (Number(splitSession[2]) >= Number(splitDate[0])) {
                if (!theatreIds.includes(theatre.id)) {
                  filteredTheatres.push(theatre);
                  theatreIds.push(theatre.id);
                }
              }
            } else if (Number(splitSession[1]) > Number(splitDate[1])) {
              if (!theatreIds.includes(theatre.id)) {
                filteredTheatres.push(theatre);
                theatreIds.push(theatre.id);
              }
            }
          } else {
            if (!theatreIds.includes(theatre.id)) {
              filteredTheatres.push(theatre);
              theatreIds.push(theatre.id);
            }
          }
        });
      } else if (priceSplit === 80 && theatre.price >= 80) {
        session.forEach((sessionItem) => {
          var splitSession = sessionItem.date.split("-");
          if (selectedDate != "") {
            if (Number(splitSession[1]) == Number(splitDate[1])) {
              if (Number(splitSession[2]) >= Number(splitDate[0])) {
                if (!theatreIds.includes(theatre.id)) {
                  filteredTheatres.push(theatre);
                  theatreIds.push(theatre.id);
                }
              }
            } else if (Number(splitSession[1]) > Number(splitDate[1])) {
              if (!theatreIds.includes(theatre.id)) {
                filteredTheatres.push(theatre);
                theatreIds.push(theatre.id);
              }
            }
          } else {
            if (!theatreIds.includes(theatre.id)) {
              filteredTheatres.push(theatre);
              theatreIds.push(theatre.id);
            }
          }
        });
      }
    } else if (categories.includes(selectedCategory)) {
      if (priceSplit === -1) {
        session.forEach((sessionItem) => {
          var splitSession = sessionItem.date.split("-");
          if (selectedDate != "") {
            if (Number(splitSession[1]) == Number(splitDate[1])) {
              if (Number(splitSession[2]) >= Number(splitDate[0])) {
                if (!theatreIds.includes(theatre.id)) {
                  filteredTheatres.push(theatre);
                  theatreIds.push(theatre.id);
                }
              }
            } else if (Number(splitSession[1]) > Number(splitDate[1])) {
              if (!theatreIds.includes(theatre.id)) {
                filteredTheatres.push(theatre);
                theatreIds.push(theatre.id);
              }
            }
          } else {
            if (!theatreIds.includes(theatre.id)) {
              filteredTheatres.push(theatre);
              theatreIds.push(theatre.id);
            }
          }
        });
      } else if (
        priceSplit != 0 &&
        priceSplit != 80 &&
        priceSplit != -1 &&
        priceSplit[0] <= theatre.price &&
        priceSplit[1] >= theatre.price
      ) {
        session.forEach((sessionItem) => {
          var splitSession = sessionItem.date.split("-");
          if (selectedDate != "") {
            if (Number(splitSession[1]) == Number(splitDate[1])) {
              if (Number(splitSession[2]) >= Number(splitDate[0])) {
                if (!theatreIds.includes(theatre.id)) {
                  filteredTheatres.push(theatre);
                  theatreIds.push(theatre.id);
                }
              }
            } else if (Number(splitSession[1]) > Number(splitDate[1])) {
              if (!theatreIds.includes(theatre.id)) {
                filteredTheatres.push(theatre);
                theatreIds.push(theatre.id);
              }
            }
          } else {
            if (!theatreIds.includes(theatre.id)) {
              filteredTheatres.push(theatre);
              theatreIds.push(theatre.id);
            }
          }
        });
      } else if (priceSplit === 0 && theatre.price == 0) {
        session.forEach((sessionItem) => {
          var splitSession = sessionItem.date.split("-");
          if (selectedDate != "") {
            if (Number(splitSession[1]) == Number(splitDate[1])) {
              if (Number(splitSession[2]) >= Number(splitDate[0])) {
                if (!theatreIds.includes(theatre.id)) {
                  filteredTheatres.push(theatre);
                  theatreIds.push(theatre.id);
                }
              }
            } else if (Number(splitSession[1]) > Number(splitDate[1])) {
              if (!theatreIds.includes(theatre.id)) {
                filteredTheatres.push(theatre);
                theatreIds.push(theatre.id);
              }
            }
          } else {
            if (!theatreIds.includes(theatre.id)) {
              filteredTheatres.push(theatre);
              theatreIds.push(theatre.id);
            }
          }
        });
      } else if (priceSplit === 80 && theatre.price >= 80) {
        session.forEach((sessionItem) => {
          var splitSession = sessionItem.date.split("-");
          if (selectedDate != "") {
            if (Number(splitSession[1]) == Number(splitDate[1])) {
              if (Number(splitSession[2]) >= Number(splitDate[0])) {
                if (!theatreIds.includes(theatre.id)) {
                  filteredTheatres.push(theatre);
                  theatreIds.push(theatre.id);
                }
              }
            } else if (Number(splitSession[1]) > Number(splitDate[1])) {
              if (!theatreIds.includes(theatre.id)) {
                filteredTheatres.push(theatre);
                theatreIds.push(theatre.id);
              }
            }
          } else {
            if (!theatreIds.includes(theatre.id)) {
              filteredTheatres.push(theatre);
              theatreIds.push(theatre.id);
            }
          }
        });
      }
    }
  });

  useEffect(() => {
    document.title = "Egetre : En ucuz tiyatro biletleri";
  }, []);
  return (
    <div className={props.theme ? "main-page light" : "main-page dark"}>
      <Filter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        theme={props.theme}
      />
      <div className="theatres">
        {filteredTheatres.map((theatre, key) => {
          const session = JSON.parse(theatre.sessions);
          // if(theatre.categories.indexOf(selectedCategory) >= 0)
          return (
            <div
              onClick={() => {
                navigate(`/theatre/detail/${theatre.id}`);
              }}
              key={key}
              className="theatre"
            >
              <div className="frame">
                <img src={theatre.image} alt="" />
              </div>
              <div className="theatre-name">
                <h3>{theatre.name}</h3>
                <h3>{theatre.price}₺</h3>
              </div>
              <div className="sessions">
                {session.map((item, itemKey) => {
                  return (
                    <div key={itemKey}>
                      <p>
                        {item.date} / {item.time}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;
