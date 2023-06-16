import { useEffect, useRef, useState } from "react";
import {
    Chart as ChartJS,
    Filler,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from "chart.js";
import { Line, getElementAtEvent } from "react-chartjs-2";
import date from "date-and-time";
import { useDispatch } from "react-redux";
import { weatherTime } from "../../../actions";
import { useSelector } from "react-redux";

const WeatherDayTimesChart = ({ dayWeatherData }) => {
    const chartRef = useRef();
    const dispatch = useDispatch();
    const tempType = useSelector((state) => state.tempType);

    //a function that converts C to F and vise versa based on temptype selected
    const calcTemp = (temp) =>
        Math.round(
            temp * (tempType === "F" ? 9 / 5 : 1) + (tempType === "F" ? 32 : 0)
        );

    // ******** ChartJS plugin configuration **********

    // Please check the plugin documentaion for more clarifications
    // https://www.chartjs.org/docs/latest/getting-started/
    // https://react-chartjs-2.js.org/examples/line-chart

    ChartJS.register(
        LineElement,
        CategoryScale,
        LinearScale,
        PointElement,
        Filler
    );

    var data = {
        labels: [],
        datasets: [
            {
                fill: true,
                labels: "..",
                data: [],
                backgroundColor: "rgba(255,165,0,.2)",
                pointBackgroundColor: "orange",
                borderColor: "orange",
                borderWidth: 1,
                drawActiveElementsOnTop: true,
            },
        ],
    };

    var options = {
        responsive: true,
        maintainAspectRatio: true,
        tension: 0.4,
    };

    // ***************************

    // prepaaring the selecteddata to be displayed in the chart
    const prepareData = () => {
        let weatherTimelabels = [];
        let weatherTimeData = [];

        //loops over all the day's times and fill the labels array and data array
        dayWeatherData?.weather.forEach(({ dt_txt, main }) => {
            weatherTimelabels.push(date.format(new Date(dt_txt), "h A"));
            weatherTimeData.push(calcTemp(main.temp));
        });

        const datasets = [...data.datasets];
        datasets[0]["data"] = weatherTimeData;
        setChartData({ labels: weatherTimelabels, datasets });
    };
    const [chartData, setChartData] = useState(data);

    useEffect(() => {
        prepareData();
    }, [dayWeatherData, tempType]);

    const onClick = (event) => {
        try {
            //get the time from the clicked point and dispatches it to update the WeatherDetails data

            const selectedTimeIndex = getElementAtEvent(
                chartRef.current,
                event
            )[0].element.$context.dataIndex;

            const selectedTime = dayWeatherData?.weather[selectedTimeIndex];
            selectedTime["max"] = undefined;

            dispatch(weatherTime(selectedTime));
        } catch (error) {
            // intentionally blank as i dont want any action to be done when the user clicks outside the chart's point
        }
    };



    return (
        <div className="my-4 ">
            {dayWeatherData?.weather.length > 1 && (
                <Line
                    id="myChart"
                    data={chartData}
                    options={options}
                    height={window.innerWidth <= 576 ? 100 : 60}
                    ref={chartRef}
                    onClick={onClick}
                />
            )}
        </div>
    );
};

export default WeatherDayTimesChart;
