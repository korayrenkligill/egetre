import React, { useState } from 'react'
import { BsXCircleFill } from "react-icons/bs";
function GaleryImage(props) {
    const [show,setShow] = useState(false);

    if(!show){
        return (
        <div onClick={()=>{setShow(true)}}>
            <img src={props.url} alt="" />
        </div>
        )
    }
    else{
        return(
            <div className='absolute-frame' onClick={()=>{setShow(false)}}>
                <BsXCircleFill className='image-close-button'/>
                <img className='absolute-image' src={props.url} alt="" />
            </div>
        )
    }
}

export default GaleryImage