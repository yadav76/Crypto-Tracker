import React from 'react'
import "./styles.css"

function Grid({ coin }) {

    console.log(coin)
    return (
        <div className='grid-container'>
            <div className="info-flex">
                <img className='coin-logo' src={coin.image} alt="Coin Image" />
                <div className="name-col">
                    <p className='coin-symbol'>{coin.symbol}</p>
                    <p className='coin-name'>{coin.name}</p>
                </div>
            </div>
            {coin.price_change_percentage_24h > 0 ?
                (<div className="chip-flex">
                    <div className="price-chip">{coin.price_change_percentage_24h.toFixed(2)}%</div>
                </div>) : (
                    <div className="chip-flex">
                        <div className='price-chip price-red'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                    </div>
                )
            }
        </div>
    )
}

export default Grid