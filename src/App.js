import "./App.scss";
import WeatherComponent from "./components/WeatherComponent/WeatherContainer/WeatherContainer";

function App() {
    return (
        <div className="App container min-h-screen flex items-center justify-center">
            <WeatherComponent />
        </div>
    );
}

export default App;
