import React, { useEffect } from "react";
import { Link } from "react-router-dom";


// child of App 
const Country = ({country}) =>  {
    // component to render individual country
    return(
        <Link className="my-tr" to="/countryDetail" state={{country : country}}>
                <div className="my-td"><img className="flag" src={country.flags.png} alt="image"></img></div>
                <h3 className="my-td"> {country.name.common}</h3>
                <h3 className="my-td"> {country.capital[0]}</h3>
                <h3 className="my-td"> {country.population}</h3>
        </Link>
    );
}
export default Country; 
