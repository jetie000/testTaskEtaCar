import ICoin from "@/interfaces/Coin.interface";
import styles from './modal.module.scss'
import { useState } from "react";
import { variables } from "@/variables";
import { ICoinCase } from "@/interfaces/ICoinCase";

function Modal({ coin, isModal, setIsModal }: { coin: ICoin, isModal: boolean, setIsModal: Function }) {
    const [totalPrice, setTotalPrice] = useState(0);
    const [response, setResponse] = useState('')

    const buyCoin = () => {
        let coinsCase: ICoinCase[] = JSON.parse(localStorage.getItem(variables.USER_COINS)!) || [];
        let coinNum = (document.getElementById('coinNumInput') as HTMLInputElement).value;
        if (Number.isNaN(Number(coinNum)) || Number(coinNum) <= 0) {
            setResponse('Error');
        }
        else {
            coinsCase.push({
                id: coin.id,
                coinNum: Number(coinNum),
                priceUsd: coin.priceUsd
            })
            localStorage.setItem(variables.USER_COINS, JSON.stringify(coinsCase));
            setResponse('Ok');
        }
    }

    return (
        (coin && isModal) &&
        <div className={styles.shadow} onClick={() => { setIsModal(false); setResponse('') }}>
            <div className={styles.popup} onClick={e => e.stopPropagation()}>
                <h1>Add {coin.name}</h1>
                <h3>
                    Current price: {Number(coin.priceUsd) < 0.1
                        ? parseFloat(Number(coin.priceUsd).toPrecision(4))
                        : Number(coin.priceUsd).toFixed(3)}$

                </h3>
                <input id="coinNumInput" type="text" placeholder="Enter coins number" onChange={e => setTotalPrice(Number(e.target.value) * coin.priceUsd)} />
                <h3>
                    Total price: {totalPrice && Number((document.getElementById('coinNumInput') as HTMLInputElement)?.value) >= 0 ?
                        totalPrice < 0.1
                            ? parseFloat(totalPrice.toPrecision(4))
                            : totalPrice.toFixed(3) :
                        0}$
                </h3>
                <button onClick={buyCoin}>
                    Buy
                </button>
                <div className={styles.response}>
                    {response != '' &&
                        <h4>{response}</h4>
                    }
                </div>
            </div>
        </div>
    );
}

export default Modal;