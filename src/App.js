import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeandLocation from './components/TimeandLocation';
import TemperatureandDetails from './components/TemperatureandDetails';
import getFormattedWeatherData from './services/WeatherService';
import { useEffect, useState } from 'react';

function App() {

     const [query , setQuery] = useState({q :"Mumbai"});
     const [units , setUnits] = useState("metric");
     const [weather, setWeather] = useState(null);


     useEffect(()=>{
      const fetchWeather = async ()=>{
        const message = query.q ? query.q : "current location.."

        toast.info("Fetching weather for " + message);
         await getFormattedWeatherData({...query , units}).then((data)=>{
           setWeather(data);
         });
        
     };
  
       fetchWeather();
     } ,[query , units])


     const formatBackground = ()=>{
        if(!weather) return  "from-cyan-700 to-blue-700 "

        const threshold = units ==="metric"? 20 : 40;
        if(weather.temp <= threshold) return "from-cyan-700 to-blue-700 "

        return "from-yellow-700 to-orange-700";

      } 

  

  return (
    <div className ={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit  ${formatBackground()}`}>
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>
      
     {weather && (
      <div>
      <TimeandLocation weather={weather}/>
      <TemperatureandDetails weather={weather}/>
      </div>
     )}


 <ToastContainer autoClose={1000} theme='colored' newestOnTop={true} />
    
    </div>
  );
}

export default App;
