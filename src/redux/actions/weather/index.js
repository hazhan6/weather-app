import axios from 'axios';
import { apiKey } from '../../../config';

export const getWeather = (city) => {
    return async (dispatch) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
        .then((response) => {
            const data = response.data
            dispatch({
            type: "GET_WEATHER",
            payload: {
                data,
            },
            });
        })
        .catch((error) => {
            console.log("error", error);
        });
    };
};

export const getWeather4Days = ({lat,lon}) => {
    return async (dispatch) => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then((response) => {
            const data = response.data
            dispatch({
            type: "GET_WEATHER4DAYS",
            payload: {
                data,
            },
            });
        })
        .catch((error) => {
            console.log("error", error);
        });
    };
};
