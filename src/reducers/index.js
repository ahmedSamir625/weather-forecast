import { combineReducers } from "redux";
import tempratureTypeReducer from "./tempratureTypeReducer";
import weatherTimeReducer from "./weatherTimeReducer";
import selectedDayReducer from "./selectedDayReducer";
import lcoationReducer from "./locationReducer";

const allReducers = combineReducers({
    tempType: tempratureTypeReducer,
    weatherTime: weatherTimeReducer,
    selectedDay: selectedDayReducer,
    location: lcoationReducer,
});

export default allReducers;
