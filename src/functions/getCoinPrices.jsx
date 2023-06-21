import axios from "axios";

export const getCoinPrices = (id, days) => {
    const prices = axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`)
        .then(res => {
            // console.log("Prices", res.data.prices);

            return res.data.prices;
            // setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
            // setIsLoading(false);
        })
    return prices;
}

// Now get info for making chart for crypto coin