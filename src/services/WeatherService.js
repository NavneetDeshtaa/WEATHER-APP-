import {DateTime} from "luxon";

const API_KEY = "cd2adcf8c21bbfb1e4cee6b882e79c2f";
const BASE_URL = "https://api.openweathermap.org/data/2.5"

// https://api.openweathermap.org/data/3.0/onecall?
// lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}

const getWeatherData = (infoType , searchParams)=>{
 
    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({...searchParams , appid:API_KEY})

   
    return fetch(url)
    .then((res)=> res.json())
}

// const formatForecastWeather = (data) => {
//     let { timezone, daily, hourly } = data;

//     // Check if 'daily' and 'hourly' exist before accessing them
//     if (!daily || !hourly) {
//         throw new Error("Invalid forecast weather data");
//     }

//     // Process 'daily'
//     daily = daily.slice(1, 6).map((d) => {
//         return {
//             title: formatToLocalTime(d.dt, timezone, 'ccc'),
//             temp: d.temp,
//             icon: d.weather[0].icon,
//         };
//     });

//     // Process 'hourly'
//     hourly = hourly.slice(1, 6).map((d) => {
//         return {
//             title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
//             temp: d.temp.day,
//             icon: d.weather[0].icon,
//         };
//     });

//     return { timezone, daily, hourly };
// };




const formatCurrentWeather = (data)=>{
     const {
        coord:{ lat, lon},
        main:{temp , feels_like , temp_min , temp_max, humidity},
        name ,
        dt,
        sys:{country , sunrise , sunset},
        weather,
        wind:{speed}
     } = data ;

     const {main: details , icon} = weather[0] ;

     return {lat, lon ,temp , feels_like , temp_min , temp_max, humidity,name ,dt,country , sunrise , sunset,
     details, icon, speed}
}


const getFormattedWeatherData =  async (searchParams)=>{
    try {
        // Call the getWeatherData function with the correct parameters
        const weatherData = await getWeatherData("weather", searchParams);
        
        // Check if the API response contains valid data
        if (!weatherData || weatherData.cod !== 200) {
            throw new Error("Invalid weather data");
        }

        // Use formatCurrentWeather function to extract and format relevant information
        const formattedCurrentWeather = formatCurrentWeather(weatherData);


   // functions for calling onecall api ......

    //     const {lat , lon }  = formattedCurrentWeather;

    //    const getForecastWeather = await getWeatherData("onecall" , {
    //         lat , lon , exclude:"minutely,current,alerts" , units :searchParams.units
    //    }).then(formatForecastWeather);


       

    //     return {...formattedCurrentWeather , ...getForecastWeather};

        return(formattedCurrentWeather);
    } 
    
        catch (error) {
        console.error("Error fetching weather data:", error);
        throw error; // Re-throw the error to propagate it to the caller
    }
};

const formatToLocalTime = (secs , zone , format = "cccc , dd LLL yyyy' | Local time:'hh:mm a")=>
         DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconFromUrl = (code)=>
     `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export {iconFromUrl , formatToLocalTime} ;