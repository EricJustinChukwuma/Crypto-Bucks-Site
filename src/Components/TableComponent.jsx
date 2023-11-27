import React, { useContext, useState } from 'react';
import { CryptoContext } from '../Context/CryptoContext';
import { BiStar } from "react-icons/bi";
import Pagination from './Pagination';
import { Link } from "react-router-dom";
import { SavedContext } from '../Context/SavedContext';


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


const TableComponent = () => {
    
    let {cryptoData, currency} = useContext(CryptoContext);

    return (
    <>
        <div 
            className="flex flex-col mt-9 border border-gray-100 rounded"
        >
            {
                cryptoData ? 
                <table className="w-full table-auto lg:overflow-auto overflow-x-hidden ">
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
                            cryptoData.map(data => {
                                return (
                                    <tr 
                                        key={data.id} 
                                        className="text-center text-base border-b border-gray-100 hover:bg-gray-200 last:border-b-0"
                                    >
                                        <td className="py-4 flex items-center uppercase ml-2">
                                            <SavedBtn data={data} />
                                            <img className="w-[1.6rem] h-[1.6rem] mx-1.5" src={data.image} alt={data.name} />
                                            <span>
                                                <Link to={`/${data.id}`} className="cursor-pointer">
                                                    {data.symbol}
                                                </Link>
                                            </span>
                                        </td>
                                        <td className="py-4 lg:table-cell hidden">
                                            <Link to={`/${data.id}`} className="cursor-pointer">
                                                {data.name}
                                            </Link>
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
                <div className="w-full min-h-[55vh] h-full flex justify-center items-center gap-x-2">
                    <div className="w-14 h-14 border-[6px] border-cyan rounded-full border-b-gray-200 animate-spin" 
                    role="status"
                    />
                    <span className="ml-2">Please Wait...</span>
                </div>
            }
        </div>
        <div className="flex lg:flex-row flex-col items-center lg:justify-between justify-start mt-4 capitalize h-[2rem] gap-y-2">
            <span>Data Provided by <a className="text-cyan font-bold text-[18px]" href="http://coingecko.com" rel="noreferrer" target={"_blank"} >CoinGecko</a></span>
            <Pagination />
        </div>
    </>
    )
}

export default TableComponent