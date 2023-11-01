'use client'
import ICoin from '@/interfaces/Coin.interface';
import styles from './mycoins.module.scss'
import { useCoinByIds } from "@/hooks/useCoinByIds";
import { variables } from '@/variables';
import { ICoinCase } from '@/interfaces/ICoinCase';

function MyCoins({ favCoins, setCurrCoin, setIsModal }: { favCoins: string[], setCurrCoin: Function, setIsModal: Function }) {
    const { data: response, isSuccess } = useCoinByIds(favCoins.join(','));
    let purchases: ICoinCase[] = JSON.parse(localStorage.getItem(variables.USER_COINS)!);
    const { data: responsePurch, isSuccess: isSuccessPurch } = useCoinByIds(JSON
        .parse(localStorage.getItem(variables.USER_COINS)! || '[]')
        .map((coin: ICoin) => coin.id)
        .join(','));

    let total = 0;
    (purchases as ICoinCase[] || []).forEach((purchCoin) => (total += (Number((responsePurch?.data.data as ICoin[])?.find(coin => coin.id === purchCoin.id)!.priceUsd) - Number(purchCoin.priceUsd)) * purchCoin.coinNum));
    return (
        <aside className={styles.aside}>
            <h1>My coins</h1>
            {
                isSuccess ? (
                    response?.data.data.length > 0 ?
                        (response?.data.data as ICoin[]).map(favCoin =>
                            <div className={styles.fav_item} key={favCoin.id}>
                                <img loading="lazy"
                                    src={variables.COIN_ICONS_API_URL + (favCoin.symbol.toLowerCase() != '' ? favCoin.symbol.toLowerCase() : 'notfound')}
                                    alt={favCoin.id}
                                />
                                <h4>
                                    {favCoin.symbol}
                                </h4>
                                <h4>
                                    Price: {Number(favCoin.priceUsd) < 0.01
                                        ? parseFloat(Number(favCoin.priceUsd).toPrecision(2))
                                        : Number(favCoin.priceUsd).toFixed(2)}$
                                </h4>
                                <button onClick={() => { setCurrCoin(favCoin); setIsModal(true) }}>
                                    Add
                                </button>
                            </div>) :
                        <h4>You haven't favourite coins yet</h4>)
                    :
                    <h4>Error</h4>
            }
            <h1>My purchases</h1>
            {
                isSuccessPurch ? (
                    purchases.length > 0 ?
                        (purchases as ICoinCase[]).map(purchCoin => {
                            let coinFromApi = (responsePurch?.data.data as ICoin[]).find(coin => coin.id === purchCoin.id)!;
                            return <div className={styles.purch_wrapper} key={coinFromApi.id + purchCoin.coinNum + purchCoin.priceUsd}>
                                <div className={styles.purch_item}>
                                    <img loading="lazy"
                                        src={variables.COIN_ICONS_API_URL + (coinFromApi.symbol.toLowerCase() != '' ? coinFromApi.symbol.toLowerCase() : 'notfound')}
                                        alt={coinFromApi.id}
                                    />
                                    <h4>
                                        {coinFromApi.symbol}
                                    </h4>
                                    <h4>
                                        Price: {Number(coinFromApi.priceUsd) < 0.01
                                            ? parseFloat(Number(coinFromApi.priceUsd).toPrecision(2))
                                            : Number(coinFromApi.priceUsd).toFixed(2)}$
                                    </h4>
                                </div>
                                <div className={styles.purch_item}>
                                    <h4>
                                        Coins bought: {purchCoin.coinNum}
                                    </h4>
                                    <h4>
                                        Initial Price: {Number(purchCoin.priceUsd) < 0.01
                                            ? parseFloat(Number(purchCoin.priceUsd).toPrecision(2))
                                            : Number(purchCoin.priceUsd).toFixed(2)}$
                                    </h4>
                                </div>
                                <div className={styles.purch_item}>
                                    <h4>
                                        {Number(coinFromApi.priceUsd) - Number(purchCoin.priceUsd) > 0
                                            ? 'Gain: '
                                            : 'Loss: '
                                        }
                                    </h4>
                                    <h3>
                                        {((Math.abs(Number(coinFromApi.priceUsd) - Number(purchCoin.priceUsd))) * purchCoin.coinNum) < 0.1
                                            ? parseFloat(((Math.abs(Number(coinFromApi.priceUsd) - Number(purchCoin.priceUsd))) * purchCoin.coinNum).toPrecision(3))
                                            : ((Math.abs(Number(coinFromApi.priceUsd) - Number(purchCoin.priceUsd))) * purchCoin.coinNum).toFixed(3)}$
                                    </h3>
                                </div>
                            </div>
                        }) :
                        <h4>You haven't purchases</h4>)

                    :
                    <h4>Error</h4>
            }
            <h2 className={styles.purch_item + ' ' + styles.total}>
                Total: {Math.abs(total) < 0.1
                    ? total.toPrecision(3)
                    : total.toFixed(3)
                }$
            </h2>

        </aside >
    );
}

export default MyCoins;