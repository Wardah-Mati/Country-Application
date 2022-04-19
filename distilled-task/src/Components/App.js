import React, { useEffect, useState } from "react";
import axios from "axios";
import Country from "./Country";
import { axiosInstance } from "./AxiosSetup";
import ReactPaginate from 'react-paginate';


function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState(" ");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentpage, setCurrentpage] = useState(1);
  const [pageOffset, setPageOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(0);
  const url = "https://restcountries.com/v3.1/all";
  const countriesPerPage  = 25;
  // get data from api url using axios request
  useEffect(() => {
    //Runs only on the first render
    try {
      axiosInstance.get(`${url}`).then((response)=>{
        // store no.of pages and data in state
        setNumberOfPages(Math.ceil(response.data.length/countriesPerPage))
        setCountries(response.data) 
        console.log(response.data)
      })
      
    } catch (errors) {
      console.error(errors);
    }
  }, []);
 // change page end offset when new page offset is made
  useEffect(() =>{
    setEndOffset(pageOffset + countriesPerPage);
  },[pageOffset])

  // change start page offset when new page is clicked
  const handlePageClick = (event) => {
  
      let newOffset = 0;
      // update filtered countries if user searched, else update countries array
      if(search.length > 1){
        newOffset = (event.selected * countriesPerPage) % filteredCountries.length;
        // console.log("the newoffset is for the filtered country" + newOffset)
        console.log("the event.select value is" + event.selected)
      }
      else{
        newOffset = (event.selected * countriesPerPage) % countries.length;
      }
      // console.log("this is the another newoffset" + newOffset)
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setPageOffset(newOffset);
    // }
  };

  // update search and store in state
  const searchCountries = (searchTerm) => {
    setSearch(searchTerm)
  }
   // if user searched, store search results in filteredArray
  useEffect(() => {
    if (search !== ""){
      const countryFiltered = countries.filter((country) => {
        let countryName = country.name.common;
        return Object.values(countryName).join('').toLowerCase().includes(search.toLowerCase())
        
      })
      setFilteredCountries(countryFiltered)
      setPageOffset(0);
      // console.log(countryFiltered)
      setNumberOfPages(Math.ceil(countryFiltered.length/countriesPerPage))
    }else{
      setNumberOfPages(Math.ceil(countries.length/countriesPerPage))
    }
  },[search]);
 
  // attempted to shorten code 
  // const renderCountries = (countryArr) =>{
  //   countryArr.map((country)=>{
  //     console.log("country =>" + country)
  //     if(country.hasOwnProperty("capital") == false){
  //       console.log("capital doesn't exist for country")
  //       country.capital = ["None"]
  //     }
  //     return (<Country country={country}></Country>)
  //   })
    
  // }
  function SortData(){
    let sortedArray = [...countries];
    sortedArray.sort((a,b)=>(a.name.common > b.name.common)?1:-1);
    console.log(sortedArray[0].name.common)
    setCountries(sortedArray);
  }

  // make sure country array has loaded
  if(countries.length > 0){
    return (
      <div>
           <div className="country-app-header-2">
              <h1 className="app-title"> Country App </h1>
              <div className="search">
                  <input  className="search-bar" type="text" placeholder="Search Country" onChange={(e) => searchCountries(e.target.value)}></input>
                  <input  className="sort" type="button" value="Sort Country" onClick={()=>{SortData()}}></input>
              </div>
           </div>
            <div className="my-table">
                    <div class="my-tr-head" href="grid.html">
                        <div className="my-th">Flag</div>
                        <div className="my-th">Country</div>
                        <div className="my-th">Capital</div>
                        <div className="my-th">Population</div>
                    </div>
                    {
                      
                      search.length > 0 && filteredCountries.length > 0?
                        // renderCountries(filteredCountries)
                        filteredCountries.slice(pageOffset,endOffset).map((country) =>{
                          if(country.hasOwnProperty("capital") == false){
                            console.log("capital doesn't exist for country")
                            country.capital = ["None"]
                          }
                          return <Country country={country}></Country>    
                        })
                        
                      : //renderCountries(countries)
                      countries.slice(pageOffset,endOffset).map((country) =>{
                        if(country.hasOwnProperty("capital") == false){
                          console.log("capital doesn't exist for country")
                          country.capital = ["None"]
                        }
                        return <Country country={country}></Country>    
                      })
                    }
            </div>
            <div className="data-pagination">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=">>"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={numberOfPages}
                  previousLabel="<<"
                  renderOnZeroPageCount={null}
                  activeLinkClassName="activePage"
                />            
            </div> 
      </div>
      );
  }
}

export default App;


