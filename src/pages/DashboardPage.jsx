import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header';
import TabsComponent from '../components/Dashboard/Tabs';
import axios from "axios";
import Search from '../components/Dashboard/Search';

function DashboardPage() {

    const [search, setSearch] = useState("");
    const [coins, setCoins] = useState([]);

    const onSearchChange = (e) => {
        console.log(search);
        setSearch(e.target.value);
    }

    // Now Filter coins on basis of search
    const filteredCoins = coins.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.symbol.toLowerCase().includes(search.toLowerCase())
    )

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
            <Search search={search} onSearchChange={onSearchChange} />
            <TabsComponent coins={filteredCoins} />
        </div>
    )
}

export default DashboardPage;