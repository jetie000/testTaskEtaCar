'use client'
import ICoin from "@/interfaces/Coin.interface";
import { variables } from "@/variables";
import styles from './home.module.scss'
import { useCoinsPage } from "@/hooks/useCoinsPage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "../modal/modal";
import MyCoins from "../mycoins/MyCoins";

export default function CoinTable() {
    const { isLoading, data: response, error, isSuccess, page } = useCoinsPage();

    const [sortBy, setSortBy] = useState('rank');
    const [orderBy, setOrderBy] = useState('asc');
    const [isModal, setIsModal] = useState(false);
    const [currCoin, setCurrCoin] = useState<ICoin>();

    const router = useRouter();
    let coins: ICoin[] = response?.data.data;
    const [favCoins, setFavCoins] = useState<string[]>(JSON.parse(localStorage.getItem(variables.FAV_COINS)!) || []);

    useEffect(() => {
        localStorage.setItem(variables.FAV_COINS, JSON.stringify(favCoins));
    }, [favCoins])

    const addFavCoin = (coinId: string) => {
        setFavCoins((prev) => [...prev, coinId]);
    }
    const removeFavCoin = (coinId: string) => {
        setFavCoins(favCoins.filter(coin => coin != coinId));
    }

    if (coins?.length > 0) {
        if (Number.isNaN(Number(coins[0][sortBy as keyof ICoin])))
            coins = coins.sort((coin1, coin2) =>
                coin1[sortBy as keyof ICoin]! > coin2[sortBy as keyof ICoin]!
                    ? (orderBy === 'asc' ? 1 : -1)
                    : (orderBy === 'asc' ? -1 : 1)
            );
        else
            coins = coins.sort((coin1, coin2) =>
                Number(coin1[sortBy as keyof ICoin]!) > Number(coin2[sortBy as keyof ICoin]!)
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
            <div className={styles.blocks_wrapper}>
                <table cellSpacing={0} className={styles.coin_table}>
                    <thead>
                        <tr>
                            <th>
                                <img src="/star.svg" alt="star" />
                            </th>
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
                                <th onClick={favCoins.find(coinId => coinId === coin.id)
                                    ? () => removeFavCoin(coin.id)
                                    : () => addFavCoin(coin.id)
                                }>
                                    <img src={favCoins.find(coinId => coinId === coin.id) ? "/star-fill.svg" : "/star.svg"} alt="starfill" />
                                </th>
                                <th onClick={() => router.push('/coin/' + coin.id)}>
                                    {coin.rank}
                                </th>
                                <th onClick={() => router.push('/coin/' + coin.id)}>
                                    <img loading="lazy"
                                        src={variables.COIN_ICONS_API_URL + (coin.symbol.toLowerCase() != '' ? coin.symbol.toLowerCase() : 'notfound')}
                                        alt={coin.id}
                                    />
                                    <div>{coin.name}</div>
                                </th>
                                <th onClick={() => router.push('/coin/' + coin.id)}>
                                    {Number(coin.priceUsd) < 0.01
                                        ? parseFloat(Number(coin.priceUsd).toPrecision(2))
                                        : Number(coin.priceUsd).toFixed(2)}$
                                </th>
                                <th onClick={() => router.push('/coin/' + coin.id)}>
                                    {Number(coin.marketCapUsd) === 0
                                        ? '-'
                                        : Math.abs(Number(coin.marketCapUsd)) < 0.01
                                            ? Math.abs(Number(coin.marketCapUsd)).toPrecision(2)
                                            : Math.abs(Number(coin.marketCapUsd)).toFixed(2) + '$'}
                                </th>
                                <th onClick={() => router.push('/coin/' + coin.id)}>
                                    {Number(coin.changePercent24Hr) === 0
                                        ? '-'
                                        : (Math.abs(Number(coin.changePercent24Hr)) < 0.01
                                            ? Number(coin.changePercent24Hr).toPrecision(2)
                                            : Number(coin.changePercent24Hr).toFixed(2)) + '%'}

                                </th>
                                <th>
                                    <button onClick={() => { setCurrCoin(coin); setIsModal(true) }}>
                                        Add
                                    </button>
                                </th>
                            </tr>)
                            : <></>
                        }
                    </tbody>
                </table>
                <Modal coin={currCoin!} isModal={isModal} setIsModal={setIsModal} />
                <MyCoins setIsModal={setIsModal} favCoins={favCoins} setCurrCoin={setCurrCoin}/>
            </div>
    );
}