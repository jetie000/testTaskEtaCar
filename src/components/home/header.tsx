'use client'
import { useCoinsSearch } from '@/hooks/useCoinsSearch';
import styles from './page.module.scss'
import { useState } from 'react';
import Coin from '@/interfaces/Coin.interface';
import { variables } from '@/variables';

function Header() {
    const [searchPage, setSearchPage] = useState(1);
    const [searchVal, setSearchVal] = useState('');

    let { isLoading, data: response, error, isSuccess } = useCoinsSearch(searchVal, searchPage);

    let coins: Coin[] = response?.data.data;

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

    const showMore = () => {
        setSearchPage(searchPage + 1);
        coins = response?.data.data;
    }

    return (
        <div className={styles.header}>
            <div id={styles.shown} onClick={toogleSearch}>
                <img src={'/search.svg'} alt='search' />
                <div>
                    Search
                </div>
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
                            <div className={styles.item} key={coin.id}>
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
        </div >
    );
}

export default Header;