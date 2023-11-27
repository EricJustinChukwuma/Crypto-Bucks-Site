import React, { useState, useContext, useLayoutEffect } from "react";
import { Outlet } from 'react-router-dom';
import { TrendingContext } from "../Context/TrendingContext";
import TrendingCoin from "../Components/TrendingCoin";
import { BiReset } from "react-icons/bi";

const Trending = () => {
  const { trendData, resetTrendingResult } = useContext(TrendingContext);

  return (
    <section className="w-[80%] h-full flex flex-col mt-16 mb-24 relative">
      <div className="w-full min-h-[60vh] py-8 flex lg:flex-row flex-wrap flex-col justify-evenly border border-gray-100 rounded">
        {
          trendData && trendData.map(coin => {
            return (
              <TrendingCoin key={coin.coin_id} data={coin.item} />
            )
          })
        }
        <button className="w-[2rem] ml-4 hover:scale-110 text-cyan transition-all ease-linear absolute right-0 -top-10"
          onClick={resetTrendingResult}
        >
          <BiReset size={30} />
        </button>
      </div>

      <Outlet />
    </section>
  )
}

export default Trending;