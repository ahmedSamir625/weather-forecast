const tempratureTypeReducer = (state = "C", { type }) => {
    switch (type) {
        case "CELSIUS":
            return "C";
        case "FAHRENHEIT":
            return "F";
        default:
            return state;
    }
};

export default tempratureTypeReducer;
