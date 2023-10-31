'use client'
import { useCoinsSearch } from '@/hooks/useCoinsSearch';
import styles from './coin.module.scss';
import { useCoin } from '@/hooks/useCoin';
import Coin from '@/interfaces/Coin.interface';
import { variables } from '@/variables';
import Link from 'next/link';

function CoinPage({ id }: { id: string }) {
    const { isLoading, data: response, error, isSuccess, isError } = useCoin(id);
    let coin: Coin = (response as { data: { data: Coin } })?.data.data;
    return (
        <div className={styles.wrapper} >
            {
                isSuccess ?
                    <div className={styles.coin}>
                        <div className={styles.wrapper_left}>
                            <div className={styles.coin_title}>
                                <h1># {coin.rank}</h1>
                            </div>
                            <div className={styles.coin_title}>
                                <img loading="lazy"
                                    src={variables.COIN_ICONS_API_URL + (coin.symbol.toLowerCase() != '' ? coin.symbol.toLowerCase() : 'notfound')}
                                    alt={coin.id}
                                />
                                <h1>{coin.name}</h1>
                                <h2>{coin.symbol}</h2>
                            </div>
                            <h1>
                                Price: {Number(coin.priceUsd) < 0.01
                                    ? parseFloat(Number(coin.priceUsd).toPrecision(2))
                                    : Number(coin.priceUsd).toFixed(2)}$
                            </h1>
                            <h3 className={styles.coin_info}>
                                <div>
                                    Market cap:
                                </div>
                                <div>
                                    {Number(coin.marketCapUsd) === 0
                                        ? '-'
                                        : Math.abs(Number(coin.marketCapUsd)) < 0.01
                                            ? Math.abs(Number(coin.marketCapUsd)).toPrecision(2)
                                            : Math.abs(Number(coin.marketCapUsd)).toFixed(2) + '$'}
                                </div>
                            </h3>
                            <h3 >
                                <div className={styles.coin_info}>
                                    <div>
                                        Circulating supply:
                                    </div>
                                    <div>
                                        {Number(coin.supply) === 0
                                            ? '-'
                                            : Number(coin.supply) < 1
                                                ? Number(coin.supply).toPrecision(2)
                                                : Number(coin.supply).toFixed(0) + ' ' + coin.symbol}
                                    </div>
                                </div>
                                {Number(coin?.maxSupply) > 0 &&
                                    <input id={styles.supply_input} value={Number(coin.supply)} max={Number(coin.maxSupply)} type="range" disabled />
                                }
                            </h3>
                            <h3 >
                                <div className={styles.coin_info}>
                                    <div>
                                        Max supply:
                                    </div>
                                    <div>
                                        {Number(coin.maxSupply) === 0
                                            ? '-'
                                            : Number(coin.maxSupply) < 1
                                                ? Number(coin.maxSupply).toPrecision(2)
                                                : Number(coin.maxSupply).toFixed(0) + ' ' + coin.symbol}
                                    </div>
                                </div>
                            </h3>
                            <button id={styles.add_button}>
                                Add
                            </button>
                        </div>
                        <canvas width={100} />
                    </div> :
                    (isError ?
                        <h1 className={styles.no_coin_error}>
                            <div>Incorrect Coin Id</div>
                            <Link href={'/'}>Go back</Link>
                        </h1> :
                        <h1 className={styles.no_coin_error}>
                            <div>Loading...</div>
                        </h1>
                    )
            }
        </div >
    );
}

export default CoinPage;