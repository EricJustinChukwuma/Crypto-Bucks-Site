import React, { useContext, useState } from "react";
import debounce from "lodash.debounce";
import { FaSearch } from "react-icons/fa";
import { CryptoContext } from "../Context/CryptoContext";

const SearchInput = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");
  let { searchData, setCoinSearch, setSearchData } = useContext(CryptoContext);

  function handleInputChange(event) {
    event.preventDefault();
    // const { value } = event.target;
    let query = event.target.value;

    setSearchText(query);
    handleSearch(query);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchText);
  }

  const selectCoin = (coin) => {
    setCoinSearch(coin);
    setSearchText("");
    setSearchData();
  }

  return (
    <>
      <form className="lg:w-96 w-full lg:relative flex items-center lg:ml-7 ml-0 gap-x-2 font-tertiary">
        <input 
          type="text" 
          name="searchText" 
          className="w-full text-white rounded bg-gray-200 outline-0 border-transparent pl-2 placeholder:text-gray-100 required border focus:border-cyan hover:border-cyan transition-all ease-linear" 
          placeholder="Search here..."
          onChange={(event) => handleInputChange(event)}
          value={searchText}
        />
        <button 
          type="submit" 
          className="text-cyan absolute right-2 cursor-pointer hover:scale-110 transition-all ease-linear"
          onSubmit={handleSubmit}
        >
          <FaSearch size={20} className="w-full h-auto" />
        </button>
      </form>

      {
        searchText.length > 0 ? 
        <ul 
          className="absolute top-11 right-0 w-96 h-96 rounded overflow-x-hidden py-2 bg-gray-200/60 backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200"
        >
          {
            searchData ? 
            searchData.map(coin => {
              return (
                <li 
                  className="flex items-center ml-4 my-2 cursor-pointer"
                  onClick={() => selectCoin(coin.id)}
                  key={coin.id}
                >
                  <img className="w-[1.1rem] h-[1.1rem] mx-1.5" src={coin.thumb} alt={coin.name} />
                  <span>{coin.name}</span>
                </li>
              )
            })
            : <div className="w-full h-full flex justify-center items-center gap-x-2">
                <div className="w-10 h-10 border-[5px] border-cyan rounded-full border-b-gray-200 animate-spin" 
                role="status"
                />
                <span className="ml-2">Searching...</span>
            </div>
          }
        </ul> 
        : null
      }
    </>
  )
};


const Search = () => {
  
  let { getSearchResult } = useContext(CryptoContext);
  // let {searchData} = useContext(CryptoContext);

  const debounceFunc = debounce(function(val) {
    getSearchResult(val)
  }, 2000)


  return (
    <div className="relative">
      <SearchInput handleSearch={debounceFunc}/>
    </div>
  )
}

export default Search


/*------------------------------------------ COMPLETED --------------------------------------------- */