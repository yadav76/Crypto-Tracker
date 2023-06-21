import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Common/Header';
import Loader from '../components/Common/Loader';
import { coinObject } from '../functions/stripData';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coin/CoinInfo';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import LineChart from '../components/Coin/LineChart';
import { convertDate } from '../functions/convertDate';
import BackToTop from '../components/Common/BackToTop'


function CoinPage() {
    // Here whatever I write in a URL from App.js in Coin Component that will be Destructured here as [id] from useParams() object.

    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [coinData, setCoinData] = useState();  //to store data of a particular Coin

    const [chartData, setChartData] = useState({});  // to store data for x-axis & y-axis

    const [days, setDays] = useState(60);

    // Now make API call for a particular Coin by {id}
    useEffect(() => {
        if (id) {

            getData();  // call getData() to set data to coinData variable
        }
    }, [id])

    //Now I am shifting my API call inside async function
    async function getData() {

        const data = await getCoinData(id);

        //Now strip coinData into small Data
        if (data) {
            coinObject(setCoinData, data);

            const prices = await getCoinPrices(id, days);
            // console.log(prices);
            if (prices.length > 0) {
                // console.log("WOHOOOO");

                // set chartData
                setChartData(
                    {
                        labels: prices.map(price => convertDate(price[0])),
                        datasets: [
                            {
                                label: 'Dataset 1',
                                data: prices.map(price => (price[1])),
                                borderColor: "#3a80e9",
                                borderWidth: 2,
                                fill: true,    // fill the graph with below borderColor
                                tension: 0.23,  // to show curved edges of graph
                                backgroundColor: "rgba(58,128,233,0.1)",
                                pointRadius: 0,  // Point radius of every point of (x,y) on graph

                            },
                        ]
                    }
                )

                setIsLoading(false);
            }
        }


    }

    return (
        <div>
            <BackToTop />
            <Header />
            {isLoading ? <Loader /> : (
                <>
                    <div className="grey-wrapper">
                        <List coin={coinData} />
                    </div>
                    <div className="grey-wrapper">
                        <LineChart chartData={chartData} />
                    </div>
                    <CoinInfo heading={coinData.name} desc={coinData.desc} />
                </>
            )}
        </div>
    )
}

export default CoinPage