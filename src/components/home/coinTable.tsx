'use client'
import Coin from "@/interfaces/Coin.interface";
import { variables } from "@/variables";
import styles from './page.module.scss'
import { useCoinsPage } from "@/hooks/useCoinsPage";
import { useState } from "react";

export default function CoinTable() {
    const { isLoading, data: response, error, isSuccess, page } = useCoinsPage();

    const [sortBy, setSortBy] = useState('rank');
    const [orderBy, setOrderBy] = useState('asc');

    let coins: Coin[] = response?.data.data;

    if (coins?.length > 0) {
        if (Number.isNaN(Number(coins[0][sortBy as keyof Coin])))
            coins = coins.sort((coin1, coin2) =>
                coin1[sortBy as keyof Coin]! > coin2[sortBy as keyof Coin]!
                    ? (orderBy === 'asc' ? 1 : -1)
                    : (orderBy === 'asc' ? -1 : 1)
            );
        else
            coins = coins.sort((coin1, coin2) =>
                Number(coin1[sortBy as keyof Coin]!) > Number(coin2[sortBy as keyof Coin]!)
                    ? (orderBy === 'asc' ? 1 : -1)
                    : (orderBy === 'asc' ? -1 : 1)
            );
    }


    const sortCoins = (param: string) => {
        console.log(param);
        if (sortBy === param) {
            setOrderBy(orderBy === 'asc' ? 'desc' : 'asc');
        }
        else {
            setSortBy(param);
            setOrderBy('asc');
        }
    }

    return (
        isLoading
            ?
            <h1 className={styles.loading}>
                Loading...
            </h1>
            :
            <table cellSpacing={0} className={styles.coin_table}>
                <thead>
                    <tr>
                        <th onClick={() => sortCoins('rank')}>
                            #
                            {sortBy === 'rank' ?
                                (orderBy === 'asc'
                                    ? <img src="caret-up-fill.svg" alt="up" />
                                    : <img src="caret-down-fill.svg" alt="down" />
                                )
                                : <div className={styles.empty} />
                            }
                        </th>
                        <th onClick={() => sortCoins('name')}>
                            Name
                            {sortBy === 'name' ?
                                (orderBy === 'asc'
                                    ? <img src="caret-up-fill.svg" alt="up" />
                                    : <img src="caret-down-fill.svg" alt="down" />
                                )
                                : <div className={styles.empty} />
                            }
                        </th>
                        <th onClick={() => sortCoins('priceUsd')}>
                            {sortBy === 'priceUsd' ?
                                (orderBy === 'asc'
                                    ? <img src="caret-up-fill.svg" alt="up" />
                                    : <img src="caret-down-fill.svg" alt="down" />
                                )
                                : <div className={styles.empty} />
                            }
                            Price
                        </th>
                        <th onClick={() => sortCoins('marketCapUsd')}>
                            {sortBy === 'marketCapUsd' ?
                                (orderBy === 'asc'
                                    ? <img src="caret-up-fill.svg" alt="up" />
                                    : <img src="caret-down-fill.svg" alt="down" />
                                )
                                : <div className={styles.empty} />
                            }
                            Market Cap
                        </th>
                        <th onClick={() => sortCoins('changePercent24Hr')}>
                            {sortBy === 'changePercent24Hr' ?
                                (orderBy === 'asc'
                                    ? <img src="caret-up-fill.svg" alt="up" />
                                    : <img src="caret-down-fill.svg" alt="down" />
                                )
                                : <div className={styles.empty} />
                            }
                            24h %
                        </th>
                        <th>
                            Add
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {coins ? coins.map(coin =>
                        <tr key={coin.id}>
                            <th>
                                {coin.rank}
                            </th>
                            <th>
                                <img loading="lazy"
                                    src={variables.COIN_ICONS_API_URL + (coin.symbol.toLowerCase() != '' ? coin.symbol.toLowerCase() : 'notfound')}
                                    alt={coin.id}
                                />
                                <div>{coin.name}</div>
                            </th>
                            <th>
                                {Number(coin.priceUsd) < 0.01
                                    ? parseFloat(Number(coin.priceUsd).toPrecision(2))
                                    : Number(coin.priceUsd).toFixed(2)}$
                            </th>
                            <th>
                                {Number(coin.marketCapUsd) === 0
                                    ? '-'
                                    : Math.abs(Number(coin.marketCapUsd)) < 0.01
                                        ? Math.abs(Number(coin.marketCapUsd)).toPrecision(2)
                                        : Math.abs(Number(coin.marketCapUsd)).toFixed(2) + '$'}
                            </th>
                            <th>
                                {Number(coin.changePercent24Hr) === 0
                                    ? '-'
                                    : (Math.abs(Number(coin.changePercent24Hr)) < 0.01
                                        ? Number(coin.changePercent24Hr).toPrecision(2)
                                        : Number(coin.changePercent24Hr).toFixed(2)) + '%'}

                            </th>
                            <th>
                                <button>Add</button>
                            </th>
                        </tr>)
                        : <></>
                    }
                </tbody>
            </table>
    );
}