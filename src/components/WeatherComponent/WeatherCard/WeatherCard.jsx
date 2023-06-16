import { useDispatch, useSelector } from "react-redux";
import { weatherTime, selectedDay } from "../../../actions";
import date from "date-and-time";

const WeatherCard = ({ cardData }) => {
    const { day, max, min, dayIcon, weather } = cardData;

    const dispatch = useDispatch();
    const activeDay = useSelector((state) => state.selectedDay);

    // dispaches the clicked card data to updated WeatherDetails component
    const updateWeatherDayData = () => {
        let clickedCardData = {};

        // a bool to check if the selected day's data contains 12PM time data
        let containsNoonTime = false;

        // loops over all day's times anf get the 12PM time if found
        weather.forEach((time) => {
            if (date.format(new Date(time.dt_txt), "H") === "12") {
                clickedCardData = time;
                containsNoonTime = true;
            }
        });

        // if 12PM time not found send the first time in the array
        if (!containsNoonTime) {
            clickedCardData = weather[0];
        }

        clickedCardData["max"] = max;

        dispatch(selectedDay(day));
        dispatch(weatherTime(clickedCardData));
    };
    
    const tempType = useSelector((state) => state.tempType);

    // convert from C to F based on the tempType selected
    const calcTemp = (temp) =>
        Math.round(
            temp * (tempType === "F" ? 9 / 5 : 1) + (tempType === "F" ? 32 : 0)
        );

    return (
        <div
            className="weather-card w-20 rounded-xl  hover:cursor-pointer last:mr-0 text-center py-2"
            onClick={updateWeatherDayData}
            style={{
                // highlight the selected card "day"
                backgroundColor: activeDay === day ? "#f8f9fa" : "transparent",
            }}
        >
            <h4>{day}</h4>
            <div className="max-w-full">
                <img
                    className="inline-block w-12 mx-auto my-2"
                    src={require(`../../../assets/imgs/${dayIcon}.png`)}
                    alt="weather"
                />
            </div>
            <h5 className="text-xs">
                <span className="mr-1 ">{calcTemp(max)}&#176;</span>
                <span className="text-gray-500">{calcTemp(min)}&#176;</span>
            </h5>
        </div>
    );
};

export default WeatherCard;
