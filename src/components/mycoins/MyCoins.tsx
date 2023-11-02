'use client'
import ICoin from '@/interfaces/Coin.interface';
import styles from './mycoins.module.scss'
import { useCoinByIds } from "@/hooks/useCoinByIds";
import { variables } from '@/variables';
import { ICoinCase } from '@/interfaces/ICoinCase';
import Modal from '../modal/modal';
import { useLocalFavs } from '@/hooks/useLocalFavs';
import { useSetLocalFavs } from '@/hooks/useSetLocalFavs';
import { usePurchases } from '@/hooks/usePurchases';
import { useSetPurchases } from '@/hooks/useSetPurchases';
function MyCoins({ setResponse, setCurrCoin, setModalPurpose }: { setResponse: Function, setCurrCoin: Function, setModalPurpose: Function }) {

    const { data: responseFavs, isSuccess: isSuccessLocalFavs } = useLocalFavs();
    const setFavCoins = useSetLocalFavs();

    const { data: response, isSuccess } = useCoinByIds((responseFavs || []).join(','));
    const { data: responsePurch, isSuccess: isSuccessPurch } = useCoinByIds(JSON
        .parse(localStorage.getItem(variables.USER_COINS)! || '[]')
        .map((coin: ICoin) => coin.id)
        .join(','));

    let total = 0;

    const addFavCoin = (coinId: string) => {
        setFavCoins.mutate(responseFavs!.concat(coinId));
    }
    const removeFavCoin = (coinId: string) => {
        setFavCoins.mutate(responseFavs!.filter(coin => coin != coinId));
    }
    const removePurchase = (index: number) => {
        setPurchases.mutate(purchases!.slice(0,index).concat(purchases!.slice(index + 1)));
    }

    const { data: purchases, isSuccess: isSuccessPurchases } = usePurchases();
    const setPurchases = useSetPurchases();
    (purchases as ICoinCase[] || []).forEach((purchCoin) => (total += (Number((responsePurch?.data.data as ICoin[])?.find(coin => coin.id === purchCoin.id)!.priceUsd) - Number(purchCoin.priceUsd)) * purchCoin.coinNum));

    return (
        <Modal setResponse={setResponse} setModalPurpose={setModalPurpose} isHeader={false}>
            <div className={styles.my_coins}>
                <h1>My coins</h1>
                {
                    isSuccess ? (
                        response?.data.data?.length > 0 ?
                            (response?.data.data as ICoin[]).map(favCoin =>
                                <div className={styles.fav_item} key={favCoin.id}>
                                    <div onClick={responseFavs!.find(coinId => coinId === favCoin.id)
                                        ? () => removeFavCoin(favCoin.id)
                                        : () => addFavCoin(favCoin.id)
                                    }>
                                        <img className={styles.fav} src={responseFavs!.find(coinId => coinId === favCoin.id) ? "/star-fill.svg" : "/star.svg"} alt="starfill" />
                                    </div>
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
                                    <button onClick={() => { setCurrCoin(favCoin); setModalPurpose('add') }}>
                                        Add
                                    </button>
                                </div>) :
                            <h4>You haven't favourite coins yet</h4>)
                        :
                        <h4>Error</h4>
                }
                <h1>My purchases</h1>
                {
                    (isSuccessPurchases && isSuccessPurch) ? (
                        (purchases || []).length > 0 ?
                            (purchases as ICoinCase[]).map((purchCoin, index) => {
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
                                        <button onClick={() => removePurchase(index)}>
                                            Sell
                                        </button>
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
            </div>
            <></>
        </Modal>
    );
}

export default MyCoins;