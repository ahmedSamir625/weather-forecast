import { useState, useEffect } from "react";
import date from "date-and-time";
import WeatherCardsContainer from "../../WeatherComponent/WeatherCardsContainer/WeatherCardsContainer";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import { useDispatch, useSelector } from "react-redux";
import { selectedDay, weatherTime, locationDetails } from "../../../actions";
import WeatherDayTimesChart from "../WeatherDayTimesChart/WeatherDayTimesChart";
import CircularProgress from "@mui/material/CircularProgress";

const WeatherComponent = () => {
    const dispatch = useDispatch();

    const [weatherData, setWeatherData] = useState({});
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [apiURL, setApiURL] = useState("");

    const activeDay = useSelector((state) => state.selectedDay);

    // prepare the data cooming from the API
    const prepareData = (data) => {
        let daysWeather = {};

        // group each day's data together
        data.forEach((weatherTime) => {
            let day = date.format(new Date(weatherTime.dt_txt), "ddd");
            if (daysWeather[day]) {
                daysWeather[day].weather.push(weatherTime);
            } else {
                daysWeather[day] = { weather: [weatherTime] };
            }
        });

        // loops over each day's data and gets the highest & lowest degrees
        // also gets the weather icon of time 12PM as it would be the middle of the day
        Object.keys(daysWeather)?.forEach((day) => {
            let max = -10000,
                min = 10000;
            daysWeather[day]["day"] = day;
            let firstTimeIcon;

            daysWeather[day].weather.forEach((time) => {
                time.main.temp_max > max && (max = time.main.temp_max);
                time.main.temp_min < min && (min = time.main.temp_min);

                if (!firstTimeIcon) {
                    firstTimeIcon = time.weather[0].icon;
                }

                if (date.format(new Date(time.dt_txt), "H") === "12") {
                    daysWeather[day]["dayIcon"] = time.weather[0].icon;
                }
            });
            daysWeather[day]["max"] = Math.round(max);
            daysWeather[day]["min"] = Math.round(min);

            if (!daysWeather[day]["dayIcon"]) {
                daysWeather[day]["dayIcon"] = firstTimeIcon;
            }
        });

        setWeatherData(daysWeather);

        // dispatches the first time weather data in the initial current day
        dispatch(weatherTime(Object.values(daysWeather)[0].weather[0]));

        // dispathes the initial current day name
        dispatch(selectedDay(Object.keys(daysWeather)[0]));
    };

    // prepares the api url to fetch the data from
    const getWeatherAPI_URL = () => {
        const apiKey = "308847892b6aaba5b659326e30c343d2";
        const location = window.navigator && window.navigator.geolocation;
        const defaultCity = "cairo";

        //checks if location service available
        if (location) {
            location.getCurrentPosition(
                (position) => {
                    // if location found send the url with latitude & longitude
                    const { latitude, longitude } = position.coords;

                    setApiURL(
                        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
                    );
                },
                () => {
                    // if failed send the url with default city
                    setApiURL(
                        `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity}&units=metric&appid=${apiKey}`
                    );
                }
            );
        } else {
            // if location service is not allowed send the url with default city
            setApiURL(
                `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity}&units=metric&appid=${apiKey}`
            );
        }
    };

    // send the api call and set the data
    const getWeatherData = () => {
        if (apiURL) {
            fetch(apiURL)
                .then((response) => response.json())
                .then((data) => {
                    prepareData(data.list);

                    dispatch(
                        locationDetails({
                            city: data.city.name,
                            country: data.city.country,
                        })
                    );

                    console.log("updated");
                })
                .finally(() => setIsLoading(false))
                .catch((e) => {
                    setError("Ooops! Something went wrong!");
                });
        }
    };

    // setInterval(() => {
    //     getWeatherData();
    //     //TODO: MAKE NOT REVERTING BACK TO THE INITIAL STATE
    // }, 30000);

    useEffect(() => {
        getWeatherAPI_URL();
    }, []);

    useEffect(() => {
        getWeatherData();
    }, [apiURL]);

    return (
        <>
            {isLoading ? (
                <CircularProgress />
            ) : error ? (
                <div>{error} &#9785;</div>
            ) : (
                <div className="bg-white p-3 rounded-xl drop-shadow-md max-w-2xl">
                    <WeatherDetails />
                    <WeatherDayTimesChart
                        dayWeatherData={weatherData[activeDay]}
                    />
                    <WeatherCardsContainer daysWeather={weatherData} />
                </div>
            )}
        </>
    );
};

export default WeatherComponent;
