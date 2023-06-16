const locationReducer = (
    state = {city:'Cairo',country:'Egypt'},
    { type, payload }
) => {
    switch (type) {
        case "LOCATION":
            return payload;
        default:
            return state;
    }

};

export default locationReducer;
