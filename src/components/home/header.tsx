'use client'
import { useCoinsSearch } from '@/hooks/useCoinsSearch';
import styles from './home.module.scss'
import { useState } from 'react';
import ICoin from '@/interfaces/Coin.interface';
import { variables } from '@/variables';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Header() {
    const [searchPage, setSearchPage] = useState(1);
    const [searchVal, setSearchVal] = useState('');

    let { isLoading, data: response, error, isSuccess } = useCoinsSearch(searchVal, searchPage);

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

    const showMore = () => {
        setSearchPage(searchPage + 1);
        coins = response?.data.data;
    }

    return (
        <div className={styles.header}>
            <h2 className={styles.title}>
                <Link href={'/'}>
                    Cryptocurrency by jetie
                </Link>
            </h2>
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
        </div >
    );
}

export default Header;