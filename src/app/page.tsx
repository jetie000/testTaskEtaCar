import Header from '@/components/home/header'
import styles from '../components/home/page.module.scss'
import CoinTable from '@/components/home/coinTable'
import Pagination from '@/components/home/pagination'

export default function Home() {

  return (
    <main className={styles.main}>
      <CoinTable/>
      <Pagination/>
    </main>
  )
}
