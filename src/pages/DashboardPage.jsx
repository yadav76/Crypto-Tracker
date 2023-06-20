import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header';
import TabsComponent from '../components/Dashboard/Tabs';
import axios from "axios";

function DashboardPage() {

    const [coins, setCoins] = useState([]);
    // url : https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en')
            .then((res) => {
                // console.log(res);
                setCoins(res.data);
            }).catch(err => {
                console.log(err);
            })
    }, [])
    return (
        <div>
            <Header />
            <TabsComponent coins={coins} />
        </div>
    )
}

export default DashboardPage;