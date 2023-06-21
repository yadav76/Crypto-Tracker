import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header';
import TabsComponent from '../components/Dashboard/Tabs';
import axios from "axios";
import Search from '../components/Dashboard/Search';
import PaginationComponent from '../components/Dashboard/Pagination';
import Loader from '../components/Common/Loader';
import BackToTop from '../components/Common/BackToTop';

function DashboardPage() {

    const [isLoading, setIsLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [coins, setCoins] = useState([]);

    const [page, setPage] = useState("");
    const [paginatedCoins, setPaginatedCoins] = useState([]); //to store 10 coins per page at a time.
    const handlePageChange = (event, value) => {
        setPage(value);

        // Now slice 10 coins from coins array
        var previousIndex = (value - 1) * 10;
        setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10));
    }

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
                setPaginatedCoins(res.data.slice(0, 10));  // by default show 10 coins on Dashboard

                // as soon as I get data from API I set my Loader to false 
                setIsLoading(false);
            }).catch(err => {
                console.log(err);
                setIsLoading(false);
            })
    }, [])
    return (
        <>
            <BackToTop />
            <Header />
            {
                isLoading ? (<Loader />) :
                    (<div>
                        <Search search={search} onSearchChange={onSearchChange} />
                        <TabsComponent coins={search ? filteredCoins : paginatedCoins} />

                        {!search && (
                            <PaginationComponent page={page} handleChange={handlePageChange} />
                        )}
                    </div>)
            }
        </>
    )
}

export default DashboardPage;