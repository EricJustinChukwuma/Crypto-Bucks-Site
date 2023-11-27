import React, { useState, useContext, useLayoutEffect } from "react";
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { TrendingContext } from "../Context/TrendingContext";
import { SavedContext } from "../Context/SavedContext";
import { CryptoContext } from "../Context/CryptoContext";
import { BiReset, BiStar } from "react-icons/bi";
import { data } from "autoprefixer";


const SavedBtn = ({data}) => {

  const { saveCoin, allCoins, removeCoin } = useContext(SavedContext);

  const handleClick = (event) => {
    event.preventDefault();
    saveCoin(data.id);

    if(allCoins.includes(data.id)) {
      removeCoin(data.id);
    } else{
      saveCoin(data.id);
    };
  };

  return (
    <button 
      className="outline-0 border-0 bg-none cursor-pointer"
      onClick={(event) => handleClick(event)}
    >
      <BiStar 
        size={30} 
        className={`${allCoins.includes(data.id) ? "fill-cyan" : "fill-gray-100"} hover:fill-cyan`} 
      />
    </button>
  )
};


const Saved = () => {
  const { savedData, resetSavedResult } = useContext(SavedContext);

  let {currency} = useContext(CryptoContext);
  
  let navigate = useNavigate();

  const getCoinDetails = (id) => {
    navigate(id)
  };

  return (
    <section className="w-[80%] h-full flex flex-col mt-16 mb-24 relative">
      <div className="w-full min-h-[60vh] py-0 border border-gray-100 rounded">
        {
          savedData ? 
          <table className="w-full table-auto">
            <thead className="capitalize text-base text-gray-100 font-medium border-b border-gray-100">
              <tr>
                <th className="py-1">asset</th>
                <th className="py-1 lg:table-cell hidden">name</th>
                <th className="py-1">price</th>
                <th className="py-1 lg:table-cell hidden">total volume</th>
                <th className="py-1 lg:table-cell hidden">market cap change</th>
                <th className="py-1 lg:table-cell hidden">1H</th>
                <th className="py-1 lg:table-cell hidden">24H</th>
                <th className="py-1 lg:table-cell hidden">7d</th>
              </tr>
            </thead>
            <tbody>
              {
                savedData.map(data => {
                  return (
                    <tr 
                      key={data.id} 
                      className="text-center text-base border-b border-gray-100 hover:bg-gray-200 last:border-b-2"
                    >
                      <td className="py-4 flex items-center uppercase ml-2">
                        <SavedBtn data={data} />
                        <img 
                          className="w-[1.6rem] h-[1.6rem] mx-1.5 cursor-pointer" 
                          src={data.image} 
                          alt={data.name} 
                          onClick={() => getCoinDetails(data.id)}
                        />
                        <span
                          className="cursor-pointer" 
                          onClick={() => getCoinDetails(data.id)}
                        >
                          {data.symbol}
                        </span>
                      </td>
                      <td className="py-4 cursor-pointer lg:table-cell hidden" onClick={() => getCoinDetails(data.id)}>
                        {data.name}
                      </td>
                      <td className="py-4">
                        {
                          new Intl.NumberFormat("en-IN", {
                            style: "currency", 
                            currency: currency
                          }).format(data.current_price)
                        }
                      </td>
                      <td className="py-4 lg:table-cell hidden">{data.total_volume}</td>
                      <td className="py-4 lg:table-cell hidden">{data.market_cap_change_percentage_24h}%</td>
                      <td 
                        className={data.price_change_percentage_1h_in_currency > 0 ? "text-green py-4 lg:table-cell hidden" : "text-red py-4 lg:table-cell hidden"}
                      >
                        {Number(data.price_change_percentage_1h_in_currency).toFixed(2)}
                      </td>
                      <td 
                        className={data.price_change_percentage_24h_in_currency > 0 ? "text-green py-4 lg:table-cell hidden" : "text-red py-4 lg:table-cell hidden"}
                      >
                        {Number(data.price_change_percentage_24h_in_currency).toFixed(2)}
                      </td>
                      <td 
                        className={data.price_change_percentage_7d_in_currency > 0 ? "text-green py-4 lg:table-cell hidden" : "text-red py-4 lg:table-cell hidden"}
                      >
                        {Number(data.price_change_percentage_7d_in_currency).toFixed(2)}
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table> : 
          <h1 className="min-h-[60vh] text-center text-lg text-gray-100 flex items-center justify-center">
            There Is No Data To Display!
          </h1>
        }
        <button className="w-[2rem] ml-4 hover:scale-110 transition-all ease-linear absolute right-0 -top-10"
          onClick={resetSavedResult}
        >
          <BiReset size={30} className="fill-cyan"/>
        </button>
      </div>

      <Outlet />
    </section>
  )
};

export default Saved;