import React, { useState, useRef, useContext} from "react";
import Search from "./Search";
// import Icons
import { AiOutlineSend, AiTwotoneStar, AiFillCaretDown } from "react-icons/ai";
import { BiReset, BiRefresh } from "react-icons/bi";
// import { FcRefresh } from "react-icons/fc";
import { CryptoContext } from "../Context/CryptoContext";

const Filters = () => {

  let { setCurrency, setSortBy, resetSearchFunction } = useContext(CryptoContext);
  const currencyRef = useRef(null);

  const handleCurrencySubmit = (event) => {
    event.preventDefault();
    let val = currencyRef.current.value
    setCurrency(val);
    currencyRef.current.value = "";
  }

  const handleSort = (event) => {
    event.preventDefault();
    let val = event.target.value;

    setSortBy(val)
  }

  return (
    <div className="w-full lg:h-12 lg:border-2 border-gray-100 rounded-lg lg:flex grid grid-rows-1 grid-cols-1 lg:items-center items-center lg:justify-between relative gap-y-4">
      
      <Search />
      <div className="flex flex-col lg:flex-row justify-center md:flex-row sm:flex-row gap-y-4">

      {/* flex lg:flex-row md:flex-row sm:flex-row xs:flex-col xs:justify-start xs:items-start lg:justify-center lg:items-center lg:mr-6 gap-y-4 */}

        <form 
          className="w-[70%] relative flex flex-row items-center font-tertiary lg:mr-12 mr-4 gap-x-2"
          onSubmit={handleCurrencySubmit}
        >
          <label htmlFor="currency"
            className="relative flex justify-center items-center lg:mr-2 font-bold"
          >
            Currency:
          </label>
          <input 
            type="text" 
            name="currency" 
            placeholder="usd"
            className="w-16 rounded bg-gray-200 placeholder:text-gray-100 outline-0 pl-2 required border border-transparent focus:border-cyan hover:border-cyan transition-all ease-linear leading-6"
            ref={currencyRef}
          />
          <button type="submit" className="cursor-pointer text-cyan hover:scale-110 transition-all ease-linear">
            <AiOutlineSend size={26} className="w-[26px] h-[26px]" />
          </button>
        </form>

        <label className="w-full relative flex lg:justify-center items-center lg:mr-0 mr-40">
          <span className="lg:w-[40%] w-[30%] font-bold flex mr-2 text-center lg:justify-center justify-start">Sort by:</span>
          <select 
            name="sortby"
            className="w-full border-transparent border-2 rounded bg-gray-200 lg:pl-2 lg:pr-10 pr-4 py-1 leading-4 capitalize outline-0 focus:outline-0 hover:border-cyan transition-all ease-linear text-base cursor-pointer relative"
            onClick={handleSort}
          >
            <option value="">-- Sort Coin --</option>
            <option value="market_cap_desc">Market cap desc</option>
            <option value="market_cap_asc">Market cap asc</option>
            <option value="volume_desc">Volume desc</option>
            <option value="volume_asc">Volume asc</option>
            <option value="id_desc">Id desc</option>
            <option value="id_asc">Id asc</option>
            <option value="gecko_desc">Gecko desc</option>
            <option value="gecko_asc">Gecko asc</option>
          </select>
          <AiFillCaretDown size={25} className="text-cyan absolute right-0 pointer-events-none" />
        </label>

        <button className="w-[2rem] ml-4 hover:scale-110 text-cyan transition-all ease-linear lg:relative lg:mr-6 absolute top-10 -right-1 lg:top-0 lg:right-0"
          onClick={resetSearchFunction}
        >
          <BiReset size={30} className=""/>
        </button>
        
      </div>      
    </div>
  )
};

export default Filters;