import React from 'react'
import { useContext } from 'react';
import { useState, useLayoutEffect } from 'react';


import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CryptoContext } from '../Context/CryptoContext';
// const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 100, pv: 2100, amt: 2100}];

function CustomTooltip({ payload, label, active, currency }) {
    if (active && payload && payload.length > 0) {
      return (
        <div className="custom-tooltip">
          <p className="label text-sm text-cyan">
            {`${label} : ${
            new Intl.NumberFormat("en-IN", {
                style: "currency", 
                currency: currency,
                minimumFractionDigits: 5,
            }).format(payload[0].value)}`}
          </p>
          {/* <p className="desc">Anything you want can be displayed here.</p> */}
        </div>
      );
    }
  
    return null;
}

const ChartComponent = ({data, currency, type}) => {

    return (
        <ResponsiveContainer height={"90%"}>
            <LineChart width={400} height={400} data={data}>
                <Line type="monotone" dataKey={type} stroke="#14ffec" strokeWidth={"1px"} />
                <CartesianGrid stroke="#323232" />
                <XAxis dataKey="name" hide />
                <YAxis dataKey={type} hide domain={["auto", "auto"]} />
                <Tooltip 
                    content={<CustomTooltip />}  
                    currency={currency} 
                    cursor={false} 
                    wrapperStyle={{outline: "none"}} 
                />
                <Legend />
            </LineChart>
        </ResponsiveContainer>
    )
};

const Chart = ({id}) => {
    const [chartData, setChartData] = useState();
    let {currency} = useContext(CryptoContext);
    const [type, setType] = useState("prices");
    const [days, setDays] = useState(7);

    useLayoutEffect(() => {
        const getChartData = async (id) => {
            try {
                const data = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`)
                .then(res => res.json())
                .then(res => res);

                console.log("Chart-Data", data);

                let convertedData = data[type].map(item => {
                    return {
                        date: new Date(item[0]).toLocaleDateString(),
                        [type]: item[1],
                    }
                })

                console.log("converted-data", convertedData);
                setChartData(convertedData);


            } catch(error) {
                console.log(error);
            }
        }

        getChartData(id);
    }, [id, type, days])


  return (
    <div className="w-full h-[60%] mb-10">
        <ChartComponent data={chartData} currency={currency} type={type} />
        <div className="flex lg:flex-row justify-start items-center lg:mt-2 mt-4 pr-3 pl-2">
            <button className={`lg:text-sm text-[12px] py-0.5 px-1.5 ml-1 bg-opacity-25 rounded capitalize ${type === "prices" ? "bg-cyan text-cyan" : "bg-gray-100 bg-opacity-2500 text-gray-100"}`} onClick={() => setType("prices")}
            >
                prices
            </button>
            <button className={`lg:text-sm text-[12px] py-0.5 px-1.5 ml-1 bg-opacity-25 rounded capitalize ${type === "market_caps" ? "bg-cyan text-cyan" : "bg-gray-100 bg-opacity-2500 text-gray-100"}`} onClick={() => setType("market_caps")}>
                market caps
            </button>
            <button className={`lg:text-sm text-[12px] py-0.5 px-1.5 ml-1 bg-opacity-25 rounded capitalize ${type === "total_volumes" ? "bg-cyan text-cyan" : "bg-gray-100 bg-opacity-2500 text-gray-100"}`} onClick={() => setType("total_volumes")}>
                total volumes
            </button>


            <button className={`lg:text-sm text-[12px] py-0.5 px-1.5 ml-1 bg-opacity-25 rounded capitalize ${days === 7 ? "bg-cyan text-cyan" : "bg-gray-100 bg-opacity-2500 text-gray-100"}`} onClick={() => setDays(7)}>7d</button>
            <button className={`lg:text-sm text-[12px] py-0.5 px-1.5 ml-1 bg-opacity-25 rounded capitalize ${days === 14 ? "bg-cyan text-cyan" : "bg-gray-100 bg-opacity-2500 text-gray-100"}`} onClick={() => setDays(14)}>14d</button>
            <button className={`lg:text-sm text-[12px] py-0.5 px-1.5 ml-1 bg-opacity-25 rounded capitalize ${days === 30 ? "bg-cyan text-cyan" : "bg-gray-100 bg-opacity-2500 text-gray-100"}`} onClick={() => setDays(30)}>30d</button>
        </div>
    </div>
  )
}

export default Chart