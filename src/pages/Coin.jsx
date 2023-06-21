import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Common/Header';
import Loader from '../components/Common/Loader';
import { coinObject } from '../functions/stripData';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coin/CoinInfo';



function CoinPage() {
    // Here whatever I write in a URL from App.js in Coin Component that will be Destructured here as [id] from useParams() object.

    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [coinData, setCoinData] = useState();  //to store data of a particular Coin

    // Now make API call for a particular Coin by {id}
    useEffect(() => {
        if (id) {
            axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
                .then((res) => {
                    console.log(res);

                    // Strip the Data in small form 
                    coinObject(setCoinData, res.data);

                    // as soon as I get data from API I set my Loader to false 
                    setIsLoading(false);
                }).catch(err => {
                    console.log(err);
                    setIsLoading(false);
                })
        }
    }, [id])

    return (
        <div>
            <Header />
            {isLoading ? <Loader /> : (
                <>
                    <div className="grey-wrapper">
                        <List coin={coinData} />
                    </div>
                    <CoinInfo heading={coinData.name} desc={coinData.desc} />
                </>
            )}
        </div>
    )
}

export default CoinPage