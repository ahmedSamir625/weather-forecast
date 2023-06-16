const weatherTimeReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case "WEATHER_TIME":
            return payload;
        default:
            return state;
    }
};

export default weatherTimeReducer;
