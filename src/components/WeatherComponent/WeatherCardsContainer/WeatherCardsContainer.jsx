import React from "react";
import WeatherCard from "../../WeatherComponent/WeatherCard/WeatherCard";

const WeatherCardsContainer = ({ daysWeather }) => {
    return (
        <div id="day-cards" className="flex flex-row flex-wrap justify-center md:justify-between">
            {Object.keys(daysWeather).map((item) => (
                <WeatherCard
                    key={daysWeather[item].day}
                    cardData={daysWeather[item]}
                />
            ))}

        </div>
    );
};

export default WeatherCardsContainer;
