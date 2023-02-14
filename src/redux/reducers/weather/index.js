const initialState = {
    data: [],
  };
  
  const WeatherReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_WEATHER":
        return {
          ...state,
          data: action.payload.data,
        };

      case "GET_WEATHER4DAYS":
        return {
          ...state,
          data: action.payload.data,
        };
  
      default:
        return state;
    }
  };

  export default WeatherReducer;
  