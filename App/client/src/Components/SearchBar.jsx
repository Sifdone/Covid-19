import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";

function SearchBar({ placeholder, data, setselectedPOI, setselectedType }) {
  const [searchHasFocus, setsearchHasFocus] = useState(false);
  const [resultsHasFocus, setresultsHasFocus] = useState(true);
  const [focus, setFocus] = useState(false);
  const [filterData, setFilterData] = useState([]);
  // eslint-disable-next-line
  const [types, setTypes] = useState([]);
  const [filterType, setFilterType] = useState([]);

  //const handleFocus = () => {

  //}

  useEffect(() => {
    if (searchHasFocus && !resultsHasFocus) {
      setresultsHasFocus(true);
      setFocus(true);
    } else if (!searchHasFocus && !resultsHasFocus) {
      setFocus(false);
    } else if (resultsHasFocus && !searchHasFocus) {
      setFocus(true);
    }
  }, [searchHasFocus, resultsHasFocus]);

  const handleSearchFocus = () => {
    setsearchHasFocus(true);
    //handleFocus();
  };
  const handleSearchBlur = () => {
    setsearchHasFocus(false);
  };

  const handleResultFocus = () => {
    setresultsHasFocus(true);
  };
  const handleResultBlur = () => {
    setresultsHasFocus(false);
  };
  /*
  function getLocationTypes(data) {
    let locationTypes = [];
    data.forEach((poi) => {
      poi.types.forEach((type) => {
        if (locationTypes.includes(type) === false) {
          locationTypes.push(type);
        }
      });
    });
    return locationTypes;
  } */

  /* const filterByType = (type,data) => {
        newFilterByType = 
        data.forEach((poi) => {
            if(poi.types.includes(type) === true){
                
            }
            


            poi.types.forEach((type) =>{
                if (locationTypes.includes(type) === false){
                    locationTypes.push(type);
                }
            })
            });
    }*/

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    let newFilter;
    let newTypeFilter;
    if (searchWord !== "") {
      newFilter = data.filter((value) => {
        return value.name.toLowerCase().includes(searchWord.toLowerCase());
      });
      newTypeFilter = types.filter((value) => {
        return value.toLowerCase().includes(searchWord.toLowerCase());
      });
      setFilterType(newTypeFilter);
      console.log(filterType);
      setFilterData(newFilter);
    } else {
      setFilterData([]);
      setFilterType([]);
    }
  };

  return (
    <Search>
      <SearchInput
        placeholder={placeholder}
        onFocus={handleSearchFocus}
        onBlur={handleSearchBlur}
        onChange={handleFilter}
      ></SearchInput>
      {focus && (filterData.length !== 0 || filterType !== 0) && (
        <Results onFocus={handleResultFocus} onBlur={handleResultBlur}>
          {filterType.map((type) => {
            return (
              <POI
                onClick={() => {
                  setselectedType(type);
                }}
              >
                See all in category: {type}
              </POI>
            );
          })}

          {filterData.map((poi) => {
            return (
              <POI
                onClick={() => {
                  handleResultBlur();
                  setselectedPOI(poi);
                }}
              >
                {poi.name}
              </POI>
            );
          })}
        </Results>
      )}
    </Search>
  );
}

export default SearchBar;

const POI = styled.button`
  padding: 2em 0 2em 1em;
  width: 100%;
  height: 2vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: none;
  background-color: #ffffff;

  &:hover {
    //transform: scale(100.5%);
    background: linear-gradient(89.81deg, #ececec -3.52%, #f5f5f5 98.63%);
  }
`;

const Results = styled.div`
  width: 65%;
  height: auto;
  max-height: 30vh;
  overflow-x: hidden;
  overflow-y: scroll;
  position: absolute;
  top: 10em;
  opacity: 80%;
  align-items: left;
  transition: all 0.2s ease-out;
`;

const Search = styled.div`
  z-index: 3;
  width: 80%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 800px;
  min-width: 150px;
  height: 4em;
  margin-top: 3em;
  margin-bottom: 1.6em;
  border: none;
  border-color: #50af8e;
  background: linear-gradient(89.81deg, #fefefe -3.52%, #ffffff 98.63%);
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.25);
  border-radius: 0.3em;
  padding: 0 1.5em;
  transition: all 0.2s ease-out;

  &:hover {
    //transform: scale(100.5%);
    background: linear-gradient(89.81deg, #ececec -3.52%, #f5f5f5 98.63%);
  }
  &:focus {
    transform: scale(101%);
    margin-bottom: 1em;
    background: linear-gradient(89.81deg, #ececec -3.52%, #f5f5f5 98.63%);
    border-style: solid;
    border-width: 0.05em;
    border-color: #387a63;
  }

  @media only screen and (max-width: 500px) {
    width: 80%;
    margin-top: 1.5em;
    &:focus {
      margin-top: 1em;
      transform: scale(101%);
      background: linear-gradient(89.81deg, #ececec -3.52%, #f5f5f5 98.63%);
      border-style: solid;
      border-width: 0.05em;
      border-color: #387a63;
    }
  }
`;
