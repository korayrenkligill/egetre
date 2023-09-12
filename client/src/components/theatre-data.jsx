import axios from 'axios';
import React, { useEffect, useState } from 'react'

function useTheGetTheatres(){
    const [theatres,setTheatres] = useState();
    useEffect(() => {
      axios
        .get("http://localhost:3001/theatres")
        .then((response) => {
          setTheatres(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
    return [theatres,setTheatres]
}

export default useTheGetTheatres;