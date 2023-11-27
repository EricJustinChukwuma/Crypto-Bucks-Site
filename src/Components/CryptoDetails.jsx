import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { CryptoContext } from '../Context/CryptoContext';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { FaBitcoin, FaTwitterSquare, FaGithub, FaFacebook, FaReddit } from "react-icons/fa";
import Chart from "./Chart";

const HighLowIndicator = ({currentPrice, high, low}) => {
  const [green, setGreen] = useState();

  useEffect(() => {
    let total = high - low;
    let greenZone = ((high - currentPrice) * 100) / total;
    setGreen(Math.ceil(greenZone));

  }, [currentPrice, high, low])

  return (
    <>
      <span className="bg-red h-1.5 rounded-l-lg w-[50%]" style={{width: `${100 - green}%`}}>&nbsp;</span>
      <span className="bg-green h-1.5 rounded-r-lg w-[50%]" style={{width: `${green}%`}}>&nbsp;</span>
    </>
  )
}


const CryptoDetails = () => {

  let { coinId } = useParams();
  let navigate = useNavigate();
  let { getCoinData, coinData:data, currency } = useContext(CryptoContext);

  useLayoutEffect(() => {
    getCoinData(coinId);
  }, [coinId]);

  const close = () => {
    navigate("..")
  }
  

  return ReactDOM.createPortal(
    <div 
      className="lg:fixed absolute lg:top-0 top-6 w-full h-full bg-gray-200/30 backdrop-blur-sm flex items-center justify-center font-tertiary"
      onClick={close}
    >
      <div 
        className="lg:w-[65%] w-[80%] lg:h-[75%] h-full bg-gray-300/75 lg:rounded-lg text-white relative"
        onClick={(e) => e.stopPropagation()}
      >
        {
          data ? 
          <div className="flex lg:flex-row flex-col items-center justify-between h-full w-full lg:p-4 lg:overflow-hidden overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200">

            <div className="flex flex-col lg:w-[45%] w-[95%] h-full pr-2">

              <div className="flex items-center w-full mt-2 lg:mt-0">
                <img className="w-[3rem] h-[3rem] mx-1.5" src={data.image.large} alt={data.id} />
                <h1 className="text-xl capitalize font-medium">{data.name}</h1>
                <span className="text-sm text-cyan py-0.5 px-2.5 ml-2 bg-cyan/20 rounded uppercase">{data.symbol}</span>
              </div>
              
              <div className="flex w-full mt-2">
                <div className="flex flex-col w-full">
                  <div className="flex justify-between">
                    <span className="text-md capitalize text-gray-100">Price</span>
                    <div 
                      className={
                        `text-sm px-1 ml-2 font-medium flex items-center rounded uppercase bg-opacity-25
                        ${data.market_data.price_change_percentage_24h > 0 ? "bg-green/20 text-green" : "bg-red text-red"}`
                      }
                    >
                      <span>{Number(data.market_data.price_change_percentage_24h).toFixed(2)}%</span>
                      <AiFillCaretDown size={30} className={`
                        w-[1.3rem] ml-0.5
                        ${
                          data.market_data.price_change_percentage_24h > 0 ?
                          "fill-green rotate-180" : "fill-red"
                        }
                      `} />
                    </div>
                  </div>
                  <h2 className="text-lg font-bold">
                    {
                      new Intl.NumberFormat("en-IN", {
                        style: "currency", 
                        currency: currency,
                        maximumSignificantDigits: 5
                      }).format(data.market_data.current_price.usd)
                    }
                  </h2>
                </div>               
              </div>

              <div className="flex lg:flex-row flex-col lg:gap-y-0 gap-y-4 w-full mt-2 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100 font-bold">Market Cap</span>
                  <h2 className="text-base font-bold">
                    {
                      new Intl.NumberFormat("en-IN", {
                        style: "currency", 
                        currency: currency,
                        minimumFractionDigits: 0
                      }).format(data.market_data.market_cap[currency])
                    }
                  </h2>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100 font-bold">fully diluted valuation</span>
                  <h2 className="text-base font-bold font-tertiary">
                    {
                      new Intl.NumberFormat("en-IN", {
                        style: "currency", 
                        currency: currency,
                        notation: "compact"
                      }).format(data.market_data.fully_diluted_valuation[currency])
                    }
                  </h2>
                </div>
              </div>

              <div className="flex flex-col w-full mt-4 justify-between">
                <span className="text-sm capitalize text-gray-100 font-bold">Total volume</span>
                <h2 className="text-base font-bold">
                  {
                    new Intl.NumberFormat("en-IN", {
                    style: "currency", 
                    currency: currency,
                    minimumFractionDigits: 0
                    }).format(data.market_data.total_volume[currency])
                  }
                </h2>
              </div>

              <div className="flex w-full mt-4 justify-between">
                <HighLowIndicator 
                  currentPrice={data.market_data.current_price[currency]}
                  high={data.market_data.high_24h[currency]}
                  low={data.market_data.low_24h[currency]}
                />
              </div>

              <div className="flex w-full mt-2 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100 font-bold">Low 24H</span>
                  <h2 className="text-base font-bold">
                    {
                      new Intl.NumberFormat("en-IN", {
                        style: "currency", 
                        currency: currency,
                        minimumFractionDigits: 5,
                      }).format(data.market_data.low_24h[currency])
                    }
                  </h2>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100 font-bold">High 24H</span>
                  <h2 className="text-base font-bold font-tertiary">
                    {
                      new Intl.NumberFormat("en-IN", {
                        style: "currency", 
                        currency: currency,
                        notation: "compact",
                        minimumFractionDigits: 5,
                      }).format(data.market_data.high_24h[currency])
                    }
                  </h2>
                </div>
              </div>

              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100 font-bold">Max Supply</span>
                  <h2 className="text-base font-bold">
                    {
                      new Intl.NumberFormat("en-IN", {
                        style: "currency", 
                        currency: currency,
                        minimumFractionDigits: 0,
                      }).format(data.market_data.max_supply)
                    }
                  </h2>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100 font-bold">circulating supply</span>
                  <h2 className="text-base font-bold font-tertiary">
                    {
                      new Intl.NumberFormat("en-IN", {
                        style: "currency", 
                        currency: currency,
                        notation: "compact",
                        minimumFractionDigits: 0,
                      }).format(data.market_data.circulating_supply)
                    }
                  </h2>
                </div>
              </div>
              
              <div className="flex flex-row w-full mt-4 justify-between">
                <div className="flex flex-col gap-y-2 lg:mb-0 mb-4 lg:w-[50%] w-[70%]">
                  <a 
                    href={data?.links?.homepage[0]}
                    target={"_blank"}
                    rel="noreferrer"
                    className="bg-gray-200 rounded px-2 py-1 text-sm text-gray-100 hover:bg-cyan/20 hover:text-cyan"
                  >
                    {data?.links?.homepage[0].substring(0, 30)}
                  </a>
                  <a 
                    href={data?.links?.blockchain_site[0]}
                    target={"_blank"}
                    rel="noreferrer"
                    className="bg-gray-200 rounded px-2 py-1 text-sm text-gray-100 hover:bg-cyan/20 hover:text-cyan"
                  >
                    {data?.links?.blockchain_site[0].substring(0, 30)}
                  </a>
                  {
                    data?.links?.official_forum_url[0] && 
                    <a 
                      href={data?.links?.official_forum_url[0]}
                      target={"_blank"}
                      rel="noreferrer"
                      className="bg-gray-200 rounded px-2 py-1 text-sm text-gray-100 hover:bg-cyan/20 hover:text-cyan"
                    >
                      {data?.links?.official_forum_url[0].substring(0, 30)}
                    </a>
                  }
                </div>

                <div className="flex flex-col justify-start lg:content-start text-center">
                  <span className="text-sm capitalize text-gray-100">Sentiment</span>
                  <div className="flex justify-between ">
                    <div 
                      className={
                        `text-sm px-1 ml-2 my-1 font-medium flex items-center rounded uppercase bg-opacity-25 bg-green/20 text-green`
                      }
                    >
                      <span>{Number(data.sentiment_votes_up_percentage).toFixed(2)}%</span>
                      <AiFillCaretUp 
                        size={30} 
                        className={`w-[1.3rem] ml-0.5 fill-green`} 
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div 
                      className={
                        `text-sm px-1 ml-2 my-1 font-medium flex items-center rounded uppercase bg-opacity-25 bg-red text-red`
                      }
                    >
                      <span>{Number(data.sentiment_votes_down_percentage).toFixed(2)}%</span>
                      <AiFillCaretDown size={30} className={`
                        w-[1.3rem] ml-0.5 fill-red
                      `} />
                    </div>
                  </div>                 
                </div>
              </div>

            </div>
            

            <div className="flex flex-col lg:w-[55%] w-full h-full lg:pl-3 pl-0 lg:mb-0 mb-4 lg:mt-0 mt-8">
              <Chart id={data.id} />

              <div className="flex flex-col mt-4 pl-2">
                <h3 className="text-white py-1"><span className="text-gray-100 capitalize mr-1">market cap rank: </span> {data.market_cap_rank}</h3>

                <h3 className="text-white py-1"><span className="text-gray-100 capitalize mr-1">coingecko rank: </span> {data.coingecko_rank}</h3>

                <h3 className="text-white py-1"><span className="text-gray-100 capitalize mr-1">coingecko score: </span> {data.coingecko_score}</h3>
              </div>
            </div>

            <div className="lg:absolute bottom-8 right-8 flex items-center lg:gap-x-3 gap-x-6 mb-4">
              {
                data.links.repos_url.github[0] && 
                <a target={`_blank`} rel="noreferrer" href={data.links.repos_url.github[0]}>
                  <FaGithub size={35} className="text-cyan hover:scale-110 fill-cyan lg:w-[40px] lg:h-[40px] w-[30px] h-[30px]"/>
                </a>
              }
              {
                data.links.twitter_screen_name && 
                <a target={`_blank`} rel="noreferrer" href={`http://twitter.com/${data.links.twitter_screen_name}`}>
                  <FaTwitterSquare size={35} className="text-cyan hover:scale-110 fill-cyan lg:w-[40px] lg:h-[40px] w-[30px] h-[30px]"/>
                </a>
              }
              {
                data.links.subreddit_url && 
                <a target={`_blank`} rel="noreferrer" href={data.links.subreddit_url}>
                  <FaReddit size={35} className="text-cyan hover:scale-110 fill-cyan lg:w-[40px] lg:h-[40px] w-[30px] h-[30px]" />
                </a>
              }
              {
                data.links.facebook_username && 
                <a target={`_blank`} rel="noreferrer" href={`https://www.facebook.com/${data.links.facebook_username}`}>
                  <FaFacebook size={35} className="text-cyan hover:scale-110 fill-cyan lg:w-[40px] lg:h-[40px] w-[30px] h-[30px]" />
                </a>
              }
            </div>
          </div> : 
          <div className="w-full min-h-[55vh] h-full flex justify-center items-center gap-x-2">
            <div className="w-14 h-14 border-[6px] border-cyan rounded-full border-b-gray-200 animate-spin" 
            role="status"
            />
            <span className="ml-2">Please Wait...</span>
          </div>
        }
      </div>

    </div>,
    document.getElementById("model")
  )
};

export default CryptoDetails;