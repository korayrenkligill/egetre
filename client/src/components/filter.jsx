import React, { useState } from 'react'
import '../styles/filter.css'
import { BsCaretDownFill } from "react-icons/bs";

function Filter(props) {
    const [categoryClass,setCategoryClass] = useState("filter-none");
    const [priceClass,setPriceClass] = useState("filter-none");
    const [dateClass,setDateClass] = useState("filter-none");
    const [allCloseClass,setAllCloseClass] = useState("all-filter-close-none");

    const Categories = ["Tüm Kategoriler","Drama","Komedi","Opera","Müzikal","Skeç","Pandomim"];
    const Prices = ["Tüm Fiyatlar","Ücretsiz","1₺ - 20₺","20₺ - 40₺","40₺ - 60₺","60₺ - 80₺","80₺ ve üzeri"];
    const Dates = [];

    const date = new Date();
    for(let i=0;i<7;i++){
        if(i===0){
            Dates.push("Tüm Tarihler");
        }
        else{
            Dates.push(date.getDate() + "/" + (date.getMonth()+1));
            date.setDate(date.getDate() + 1)
        }
    }

    const handleChangedCategory = (e)=>{
        if(e.target.value === "tüm kategoriler")
            props.setSelectedCategory("");
        else
            props.setSelectedCategory(e.target.value);
    }
    const handleChangedPrice = (e)=>{
        if(e.target.value === "tüm fiyatlar")
            props.setSelectedPrice("");
        else
            props.setSelectedPrice(e.target.value);
    }
    const handleChangedDate = (e)=>{
        if(e.target.value === ("tüm tarihler"))
            props.setSelectedDate("");
        else
            props.setSelectedDate(e.target.value);
    }
    const openCategoryFilter = ()=>{
        setCategoryClass("filter-absolute");
        setAllCloseClass("all-filter-close");
    }
    const openPriceFilter = ()=>{
        setPriceClass("filter-absolute");
        setAllCloseClass("all-filter-close");
    }
    const openDateFilter = ()=>{
        setDateClass("filter-absolute");
        setAllCloseClass("all-filter-close");
    }
    const closeAllFilter = ()=>{
        setCategoryClass("filter-none");
        setPriceClass("filter-none");
        setDateClass("filter-none");
        setAllCloseClass("all-filter-close-none");
    }
    return (
    <div className={props.theme ? 'filter light' : 'filter dark'}>
        <div className="container">
            <div className='filter-type' onClick={openCategoryFilter}>
                <div className='filter-name'>
                    <div>
                    {props.selectedCategory === "" ? <p>Türe göre filtrele</p> : <p>{props.selectedCategory}</p>}
                        <h2>Tür seçiniz</h2>
                    </div>
                    <BsCaretDownFill className='filter-icon'/>
                </div>
                <div className={categoryClass}>
                    {Categories.map((category,key)=>{return(
                        <label className='filter-item' htmlFor={category+"_"+key} key={key}>
                            {category === "Tüm Kategoriler" ? <input type="radio" name="category" id={category+"_"+key} value={category.toLocaleLowerCase()} onChange={handleChangedCategory} defaultChecked/> : <input type="radio" name="category" id={category+"_"+key} value={category.toLocaleLowerCase()} onChange={handleChangedCategory}/>}
                            <span>{category}</span>
                        </label>
                    )})}
                </div>
            </div>
            <div className='filter-type' onClick={openPriceFilter}>
                <div className='filter-name'>
                    <div>
                        {props.selectedPrice === "" ? <p>Fiyata göre filtrele</p> : <p>{props.selectedPrice}</p>}
                        <h2>Fiyat seçiniz</h2>
                    </div>
                    <BsCaretDownFill className='filter-icon'/>
                </div>
                <div className={priceClass}>
                    {Prices.map((price,key)=>{return(
                        <label className='filter-item' htmlFor={price+"_"+key} key={key}>
                            {price === "Tüm Fiyatlar" ? <input type="radio" name="price" id={price+"_"+key} value={price.toLocaleLowerCase()} onChange={handleChangedPrice} defaultChecked/> : <input type="radio" name="price" id={price+"_"+key} value={price.toLocaleLowerCase()} onChange={handleChangedPrice}/>}
                            <span>{price}</span>
                        </label>
                    )})}
                </div>
            </div>
            <div className='filter-type' onClick={openDateFilter}>
                <div className='filter-name'>
                    <div>
                        {props.selectedDate === "" ? <p>Tarihe göre filtrele</p> : <p>{props.selectedDate}</p>}
                        <h2>Tarih seçiniz</h2>
                    </div>
                    <BsCaretDownFill className='filter-icon'/>
                </div>
                <div className={dateClass}>
                    {Dates.map((category,key)=>{return(
                        <label className='filter-item' htmlFor={category+"_"+key} key={key}>
                            {category === "Tüm Kategoriler" ? <input type="radio" name="date" id={category+"_"+key} value={category.toLocaleLowerCase()} onChange={handleChangedDate} defaultChecked/> : <input type="radio" name="date" id={category+"_"+key} value={category.toLocaleLowerCase()} onChange={handleChangedDate}/>}
                            <span>{category}</span>
                        </label>
                    )})}
                </div>
            </div>
        </div>
        <button className={allCloseClass} onClick={closeAllFilter}></button>
    </div>
    )
}

export default Filter