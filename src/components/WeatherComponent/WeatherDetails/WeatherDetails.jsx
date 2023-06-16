import React from "react";
import { useSelector, useDispatch } from "react-redux";
import date from "date-and-time";
import { celsius, fahrenheit } from "../../../actions";

const WeatherDetails = () => {
    const { dt_txt, main, weather, wind, pop, max } = useSelector(
        (state) => state.weatherTime
    );

    const dispatch = useDispatch();
    const tempType = useSelector((state) => state.tempType);
    const location = useSelector((state) => state.location);

    // a function the converts from C to F and vise versa based on the temptype
    const calcTemp = (temp) =>
        Math.round(
            temp * (tempType === "F" ? 9 / 5 : 1) + (tempType === "F" ? 32 : 0)
        );

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
            <div className="col-span-3 md:text-left">
                <div className=" text-left flex flex-row  md:justify-start justify-center">
                    {weather && (
                        <img
                            src={require(`../../../assets/imgs/${weather[0]?.icon}.png`)}
                            alt="weather-img"
                            className="h-14"
                        />
                    )}

                    <h3 className="text-5xl ml-2">
                        {calcTemp(max ? max : main?.temp)}
                        &#176;{tempType}
                    </h3>
                    <div className="mt-1 ml-3 text-gray-600">
                        <span
                            className="hover:cursor-pointer "
                            onClick={() => dispatch(celsius())}
                            style={{
                                fontWeight:
                                    tempType === "C" ? "bolder" : "normal",
                            }}
                        >
                            &#176;C
                        </span>{" "}
                        &#124;
                        <span
                            className="hover:cursor-pointer "
                            onClick={() => dispatch(fahrenheit())}
                            style={{
                                fontWeight:
                                    tempType === "F" ? "bolder" : "normal",
                            }}
                        >
                            &#176;F
                        </span>
                    </div>

                    <div className="ml-3 mt-1 text-gray-600 text-xs">
                        <div>Precipitation: {pop}%</div>
                        <div>Humidity: {main?.humidity}%</div>
                        <div>Wind: {wind?.speed} km/h</div>
                        <div>
                            Feels Like: {calcTemp(main?.feels_like)}&#176;
                            {tempType}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-2 text-center md:text-right">
                <h4 className="text-2xl  capitalize pb-1">
                    {location.city}, {location.country}
                </h4>
                <div className="text-base text-zinc-700">
                    {date.format(new Date(dt_txt), "dddd")}{" "}
                    {!max && date.format(new Date(dt_txt), "h:mm A")}
                </div>
                <div className="text-base text-zinc-700 capitalize">
                    {weather && weather[0]?.description}
                </div>
            </div>
        </div>
    );
};

export default WeatherDetails;
