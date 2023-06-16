const tempratureTypeReducer = (state = "", { type, payload }) => {
    switch (type) {
        case "SELECTED_DAY":
            return payload;
        default:
            return state;
    }
};

export default tempratureTypeReducer;
