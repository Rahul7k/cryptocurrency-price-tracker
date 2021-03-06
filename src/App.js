import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then((res) => {
        setCoins(res.data);
      }).catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value)
  }
  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Cryptocurrency Price Tracker</h1>
        <form>
          <input type="text" placeholder="Search" className="coin-input" onChange={handleChange} />
        </form>
        <div className="content-container">
          <div className="content-row">
            <div className="content">
              <p>Name</p>
              <p className="content-symbol">Symbol</p>
            </div>
            <div className="content-data">
              <p className="content-price">Current Price</p>
              <p className="content-volume">Total Volume</p>
              <p className="content-percent">Price Change</p>
              <p className="content-marketcap">Market Cap Rank</p>
            </div>
          </div>
        </div>
        {filteredCoins.map(coin => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketcaprank={coin.market_cap_rank}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              volume={coin.total_volume}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
