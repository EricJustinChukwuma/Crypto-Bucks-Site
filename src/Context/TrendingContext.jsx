import { createContext, useLayoutEffect, useState } from "react";


// Create Context Object
export const TrendingContext = createContext({});

// Create the provider component
export const TrendingProvider = ({children}) => {
    const [trendData, setTrendData] = useState();

    
    const getTrendData = async () => {
        try {
            const data = await fetch(
                `https://api.coingecko.com/api/v3/search/trending`
            ).then(res => res.json())
            .then(json => json);

            console.log("Trending-Data", data);
            setTrendData(data.coins);
        } catch(error) {
            console.log(error);
        }

    };


    const resetTrendingResult = () => {
        getTrendData();
    };

    useLayoutEffect(() => {
        getTrendData();
    }, [])

    return (
        <TrendingContext.Provider 
            value={{ 
                trendData,
                resetTrendingResult
            }}
        >
            {children}
        </TrendingContext.Provider>
    )

};