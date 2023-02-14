import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeather, getWeather4Days } from "./redux/actions/weather";
import "./Card.css";

function Card() {

    const data = useSelector((state) => state.WeatherReducer.data);
    const dispatch = useDispatch();
    const [weatherData, setWeatherData] = useState([{}]);
    const [city, setCity] = useState("");
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");
    const [days, setDays] = useState([]);

    const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thurdays",
        "Friday",
        "Saturday",
    ];

    const getWeatherData = (e) => {
        if(e.key === "Enter") {
            dispatch(getWeather(city));
            setCity("");
        }
    };

    useEffect(()=>{
        if(data?.coord){
            setLat(data?.coord?.lat);
            setLon(data?.coord?.lon);
        }
    },[data]);


    useEffect(()=>{
        if(lat){
            dispatch(getWeather4Days({lat:lat,lon:lon}));
            setWeatherData(data);
        }
    },[lat,lon]);

    useEffect(()=>{
        if(data?.cod && data?.list){
            setDays([data.list[9],data.list[17],data.list[25],data.list[33]])
        }
    },[data]);

    const day = (e) =>{
     return weekdays[ new Date(e).getDay()];
    }

    return(
        <div className="container">
            <div className="header">
                <img src="./images/header-logo.svg" width="200px" height="auto" alt=""/>
                <div style={{display:"flex", alignItems:"center"}}>
                    <div className="header-text2">Weather App</div>
                </div>
            </div>
            <input 
            className="input2" 
            placeholder="Enter a City.."
            onChange={e => setCity(e.target.value)}
            value={city}
            onKeyDown={getWeatherData}
            />

            {!weatherData?.main ? (
                <></>
            ):(
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-back">
                            {days?.map(a=>
                                <div key={a?.dt_txt} className="cards">
                                    <div className="title3">{day(a?.dt_txt)}</div>
                                    <img src={`./images/weather/${a?.weather[0]?.icon}.svg`} width="100%" height="auto" alt=""/>
                                    <div className="title3">{Math.round(a?.main?.temp)}°C</div>
                                </div>
                            )}
                        </div>
                        <div className="flip-card-front">
                            <img src={`./images/weather/${weatherData?.weather[0]?.icon}.svg`} width="100%" height="100%" alt=""/>
                            <div style={{display:"grid", flexDirection:"column", minWidth:"70%"}}>
                                <p className="title2">Today</p>
                                <p className="title">{weatherData?.name}, {weatherData?.sys?.country}</p>
                                <p className="title2">Temperature: {Math.round(weatherData?.main?.temp)}°C</p>
                                <p className="title3">{weatherData?.weather[0]?.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default Card;