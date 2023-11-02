'use client'
import { useCoinsSearch } from '@/hooks/useCoinsSearch';
import styles from './home.module.scss'
import { useEffect, useState } from 'react';
import ICoin from '@/interfaces/Coin.interface';
import { variables } from '@/variables';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MyCoins from '../mycoins/MyCoins';
import Modal from '../modal/modal';
import AddCoinModalContent from "../modal/addCoinModalContent";
import { useCoinsPopular } from '@/hooks/useCoinsPopular';

function Header() {
    const [searchPage, setSearchPage] = useState(1);
    const [searchVal, setSearchVal] = useState('');
    const [modalPurpose, setModalPurpose] = useState('');
    const [responseAdd, setResponseAdd] = useState('');
    const [currCoin, setCurrCoin] = useState<ICoin>();

    let { isLoading, data: response, error, isSuccess } = useCoinsSearch(searchVal, searchPage);
    let { isLoading: isLoadingPopular, data: responsePopular, isSuccess: isSuccessPopular } = useCoinsPopular();

    let coins: ICoin[] = response?.data.data;

    const router = useRouter();

    const handleSearchClick = () => {
        setSearchVal((document.getElementById('searchInput') as HTMLInputElement).value);
        coins = response?.data.data;
    }

    const toogleSearch = () => {
        setSearchPage(1);
        setSearchVal('');
        (document.getElementById('searchInput') as HTMLInputElement).value = '';
        if (document.getElementById(styles.hidden)?.style.visibility != 'visible')
            document.getElementById(styles.hidden)!.style.visibility = 'visible';
        else
            document.getElementById(styles.hidden)!.style.visibility = 'hidden';
    }

    const toogleBurger = () => {

        const body = document.querySelector('body');
        const burgerItem = document.getElementById('burger');
        const menu = document.querySelector('nav');
        const cover = document.querySelector('.cover');
        if (burgerItem?.classList.contains(styles.header_burger_active)) {
            menu?.classList.remove(styles.nav_active);
            burgerItem.classList.remove(styles.header_burger_active);
            body?.classList.remove(styles.body_burger_active);
            cover?.classList.remove(styles.cover_active);
        }
        else {
            menu?.classList.add(styles.nav_active);
            burgerItem?.classList.add(styles.header_burger_active);
            body?.classList.add(styles.body_burger_active);
            cover?.classList.add(styles.cover_active);
        }
    }

    const showMore = () => {
        setSearchPage(searchPage + 1);
        coins = response?.data.data;
    }

    return (
        <div className={styles.header}>
            <div onClick={toogleBurger} className="cover"></div>
            <div id='burger' className={styles.burger} onClick={toogleBurger}>
                <span className={styles.burger_line}></span>
                <span className={styles.burger_line}></span>
                <span className={styles.burger_line}></span>
            </div>
            <h2 className={styles.title}>
                <Link href={'/'}>
                    Cryptocurrency by jetie
                </Link>
            </h2>
            <nav>
                <button className={styles.mycoins_link} onClick={() => setModalPurpose('mycoins')}>
                    My coins
                </button>
                <div id={styles.shown} onClick={toogleSearch}>
                    <img src={'/search.svg'} alt='search' />
                    <div>
                        Search
                    </div>
                </div>
                <div id={styles.popular}>
                    {isSuccessPopular &&
                        responsePopular?.data.data.map((coin: ICoin) =>
                            <div>
                                <div>#{coin.rank}</div>
                                <img loading="lazy"
                                    src={variables.COIN_ICONS_API_URL + (coin.symbol.toLowerCase() != '' ? coin.symbol.toLowerCase() : 'notfound')}
                                    alt={coin.id}
                                />
                                <div>
                                    {coin.symbol} - {Number(coin.priceUsd) < 0.01
                                        ? parseFloat(Number(coin.priceUsd).toPrecision(2))
                                        : Number(coin.priceUsd).toFixed(2)}$
                                </div>
                            </div>)
                    }
                </div>
                <div id={styles.hidden}>
                    <div className={styles.item}>
                        <button onClick={handleSearchClick}>
                            <img src='/search.svg' alt='search' />
                        </button>
                        <input id='searchInput' type="text" />
                        <button onClick={toogleSearch}>
                            <img src="/x-lg.svg" alt="close" />
                        </button>
                    </div>
                    {coins?.length > 0 &&
                        < div className={styles.items}>
                            {coins?.length > 0 ? coins.slice(0, coins.length - 1).map(coin =>
                                <div className={styles.item + ' ' + styles.coin_search} key={coin.id} onClick={() => router.push('/coin/' + coin.id)}>
                                    <img className={styles.coin_img} loading="lazy"
                                        src={variables.COIN_ICONS_API_URL + coin.symbol.toLowerCase()}
                                        alt={coin.id} />
                                    <div>
                                        {coin.name}
                                    </div>
                                    <div className={styles.price}>
                                        {Number(coin.priceUsd).toFixed(2)}$
                                    </div>
                                </div>
                            ) :
                                (searchVal != '' ?
                                    <div className={styles.nores}>
                                        No results
                                    </div> :
                                    <></>)
                            }
                        </div>
                    }
                    {
                        coins?.length - (searchPage * (variables.COINS_PER_SEARCH - 1)) > 0 &&
                        <div onClick={showMore} className={styles.show_more}>
                            Show more
                        </div>
                    }

                </div>
            </nav>
            {
                modalPurpose === 'mycoins' &&
                <MyCoins setResponse={setResponseAdd} setModalPurpose={setModalPurpose} setCurrCoin={setCurrCoin} />
            }
            {(currCoin && modalPurpose === 'add') &&
                <Modal setModalPurpose={setModalPurpose} setResponse={setResponseAdd} isHeader={true}>
                    <AddCoinModalContent coin={currCoin} responseAdd={responseAdd} setResponseAdd={setResponseAdd} />
                    <></>
                </Modal>
            }
        </div >
    );
}

export default Header;