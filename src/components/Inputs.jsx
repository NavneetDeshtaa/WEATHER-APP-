import React, { useState } from 'react'
import { UilSearch , UilLocationPinAlt  } from '@iconscout/react-unicons'

function Inputs({setQuery , units , setUnits}) {

     const [city , setCity] = useState("");

     const handleSearch = ()=>{
       if(city !== ""){setQuery({q:city})}
     }

     const handleLocation = ()=>{
      if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition((position)=>{
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;

          setQuery({
            lat,
            lon
          })
        });
      }
     }

     const handleUnitChange = (e)=>{
         const selectedUnit = e.currentTarget.name;
         if(units !== selectedUnit){
          setUnits(selectedUnit);
         } 
     }


  return (
    <div className='flex flex-row justify-center my-6'>
     
     <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>

        <input type='text' value={city} onChange={(e)=> setCity(e.currentTarget.value)}
         placeholder='search for city...'
        className='text-xl p-2 font-light w-full shadow-xl focus:outline-none capitalize placeholder:lowercase'>
        </input>
        
        <UilSearch size={25} className="text-white cursor-pointer transition ease-out hover:scale-125" onClick={handleSearch}/>

        <UilLocationPinAlt size={25} className="text-white cursor-pointer transition ease-out hover:scale-125" onClick={handleLocation}/>
    </div>

    <div className='flex flex-row w-1/4 items-center justify-center'>
        <button  name="metric" className='text-xl text-white font-light transition ease-out hover:scale-125' onClick={handleUnitChange}>°C</button>
        <p className='text-xl text-white mx-1'>|</p>
        <button name='imperial' className='text-xl text-white font-light transition ease-out hover:scale-125' onClick={handleUnitChange}>°F</button>
    </div>

    </div>
  )
}

export default Inputs
