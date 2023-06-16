
# Weather Forecast - Feb Activity

A weather forecats application that displays the forecast of the first five days, it also shows the weather of every 3 hours in the day.


## Technologies used

 - React.js
 - Redux
 - [tailwindcss](https://tailwindcss.com/)
 - [chart.js](https://www.chartjs.org/docs/latest/)
 - [react-chartjs-2](https://react-chartjs-2.js.org/)
 - [material-ui](https://mui.com/)
 - [date-and-time](https://www.npmjs.com/package/date-and-time)
 


## Installation

Install the project with npm

```bash
  clone project
  cd project
  npm install
  npm start
```

If you faced error when cloning related to certificate.. try the below command:
```bash
git -c http.sslVerify=false clone [repoURL]
```


## [OpenWeather API Reference](https://openweathermap.org/forecast5)
#### Get weather data based on latitude and longitude

```http
  GET api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units={unit}&appid={API key}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `API key` | `string` | **Required**. Your API key |
| `lat` | `numeric` | **Required**. latitude of the device position |
| `lon` | `numeric` | **Required**. longitude of the device position |
| `unit` | `string` | **Optional**. Temprature unit (standard-metric-imperial). **Default**: standard |



#### Get weather data based on city name

```http
  GET api.openweathermap.org/data/2.5/forecast?q=${city}&units={unit}&appid=${apiKey}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `API key` | `string` | **Required**. Your API key |
| `city` | `numeric` | **Required**. city name |
| `unit` | `string` | **Optional**. Temprature unit (standard-metric-imperial). **Default**: standard |




## Non fixed bug
#### Apply the below scenario and check the result:

```
  1- Choose Any day
  2- Click on 12PM time
```
#### Result
The weather details board won't be updated for some unkown reason despite of the Redux state updated successfully 

#### Also Apply the below scenario and check the result:

```
  1- Choose Any day
  2- Click on any time rather than 12PM
  3- Click on 12PM time
```
#### Result
The weather details board will be updated successfully with 12PM data


#### conclusion

```
When firstly clicking on any time rather than 12PM the board will be updated successfully.
But when firstly click on 12PM it won't update the details board execpt when clicking on any other time then clicking again on 12PM.
I tried so hard to find any reasonable cause for this bug but i couldn't as the redux updates successfully on every click

```
**Note:** 12PM is the time's data sent to redux when i click on any card

**Another Note:** Please let me know if you found the cause of this issue
## Icons Used
As the icons from OpenWeather API looks pretty ugly, so i had to search for other icons and map them to the Id's returned from the API, and found this link with much prettier icons:
[google-weather-icons](https://gist.github.com/h0wardch3ng/03047ea601e47e1476176833fd95efa0)
## Appendix

It's important to **REFRESH** the page when changing from desktop view to mobile view to allow chart.js recalculates its dimensions and doesn't break the screen
