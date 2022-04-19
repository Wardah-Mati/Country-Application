import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const CountryDetail = () => {
    const location = useLocation();
    const {country} = location.state

    function getCurrency(){
        for(let key in country.currencies){
            return country.currencies[key].name
        }
    }

    function getLanguage(){
        let languages = [];
        for(let key in country.languages){
            languages.push(country.languages[key] + "    ")
        }
        return languages
    }

    return(
        <div>
            <div className="country-detail-heading-2"> 
                <div className="link-to-home" ><Link to="/">Home</Link></div>
                <h1 className="detail-title"> Country Details </h1>
            </div>
            
            <img className="Country-flag" src={country.flags.png} alt="image"></img>
            <div className="details">
            <h3> Country: {country.name.common}</h3>
            <h3> Capital: {country.capital[0]}</h3>
            <h3> Population: {country.population}</h3>
            <h3> Currency:  {getCurrency()}</h3>
            <h3> Languages: {getLanguage()}</h3>
            <h3> Bordering Countries: </h3>
            {country.hasOwnProperty('borders') ? country.borders.map((border)=>{ return <h4 className="borders">{border}</h4>})
                : <h4>None</h4>}
            </div>    
    </div>

    );
}

export default CountryDetail; 