'use client'
import styles from './home.module.scss';
import Link from 'next/link';
import { useCoinsPage } from '@/hooks/useCoinsPage';
import { variables } from '@/variables';

function Pagination() {
    const { isLoading, page } = useCoinsPage();

    return (
        !isLoading &&
        <div id='pagination' className={styles.pagination}>
            <Link className={page === 1 ? styles.disabled : ''} href={'?page=1'}>
                &lt;&lt;
            </Link>
            <Link className={page === 1 ? styles.disabled : ''} href={'?page=' + ((page - 1) || 1)}>
                &lt;
            </Link>
            <Link href={''}>
                {page}
            </Link>
            <Link className={page === variables.LAST_PAGE ? styles.disabled : ''} href={'?page=' + ((page + 1) || 1)}>
                &gt;
            </Link>
            <Link className={page === variables.LAST_PAGE ? styles.disabled : ''} href={'?page=' + variables.LAST_PAGE}>
                &gt;&gt;
            </Link>
        </div>
    );
}

export default Pagination;