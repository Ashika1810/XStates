import styles from './App.module.css'
import { useEffect, useState } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  

  const getCountries= async()=>{
    try{
      const res = await fetch("https://crio-location-selector.onrender.com/countries");
      const data = await res.json();
      console.log(data);
      setCountries(data)
    }
    catch(err){
      console.log(err.message);
    }

  }

  const getStates = async()=>{
    try{
    const res = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
      const data = await res.json();
      console.log(data);
      setStates(data)
    }
    catch(err){
      console.log(err.message);
    }
  }

  const getCities = async()=>{
    try{
    const res = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
      const data = await res.json();
      console.log(data);
      setCities(data)
    }
    catch(err){
      console.log(err.message);
    }
  }

  useEffect(()=>{
    getCountries();
  },[])

  useEffect(()=>{
    if(!!selectedCountry){
    getStates();
    }
  },[selectedCountry]);

  useEffect(()=>{
    if(!!selectedCountry && !!selectedState){
      getCities();
    }
  },[selectedCountry,selectedState])



  return (
    <div className={styles.container}>
        <h1>Select Location</h1>
        <div className={styles.alignment}>
        <select value={selectedCountry} onChange={(e)=>setSelectedCountry(e.target.value)} className={styles.dropdown}>
        <option value="">Select Country</option>
        {countries.map((country)=>{
          return(
          <option key={country} value={country}>{country}</option>
          )
        })}
        <option></option>
        </select>

        <select value={selectedState} onChange={(e)=>setSelectedState(e.target.value)} className={styles.dropdown} disabled={!selectedCountry}>
        <option value="">Select State</option>
        {states.map((state)=>{
          return(
          <option key={state} value={state}>{state}</option>
          )
        })}
        <option></option>
        </select>

        <select value={selectedCity} onChange={(e)=>setSelectedCity(e.target.value)} className={styles.dropdown} disabled={!selectedState}>
        <option value="">Select City</option>
        {cities.map((city)=>{
          return(
          <option key={city} value={city}>{city}</option>
          )
        })}
        <option></option>
        </select>
        </div>
        {selectedCity ? (
          <h2>You selected <span className={styles.highlight}>{selectedCity}</span>
          <span className={styles.fade}>{", "}{selectedState}{", "}{selectedCountry}</span></h2>
        ) : null}

    </div>
  );
}

export default App;
